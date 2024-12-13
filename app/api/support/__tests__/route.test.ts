import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { POST } from '../route';
import { NextResponse } from 'next/server';

vi.mock('next/headers', () => ({
  cookies: {
    getAll: vi.fn(() => []),
  },
}));

vi.mock('@supabase/auth-helpers-nextjs', () => ({
  createRouteHandlerClient: vi.fn(),
}));

describe('Support API', () => {
  let mockSupabase: any;

  beforeEach(() => {
    mockSupabase = {
      auth: {
        getSession: vi.fn(),
      },
      from: vi.fn(() => ({
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => ({ data: { id: '123' }, error: null })),
          })),
        })),
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn(() => ({ data: [], error: null })),
          })),
        })),
        update: vi.fn(() => ({
          eq: vi.fn(() => ({
            select: vi.fn(() => ({
              single: vi.fn(() => ({ data: { id: '123' }, error: null })),
            })),
          })),
        })),
      }),
    };

    (createRouteHandlerClient as any).mockReturnValue(mockSupabase);
  });

  describe('POST /api/support', () => {
    it('should create a ticket successfully', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: {
          session: {
            user: { id: 'user123' },
          },
        },
      });

      const request = new Request('http://localhost:3000/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'create_ticket',
          data: {
            subject: 'Test Ticket',
            message: 'Test Message',
            priority: 'high',
            category: 'technical',
          },
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response).toBeInstanceOf(NextResponse);
      expect(data).toHaveProperty('ticket');
      expect(data.ticket).toHaveProperty('id', '123');
    });

    it('should handle unauthenticated requests', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
      });

      const request = new Request('http://localhost:3000/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'create_ticket',
          data: {
            subject: 'Test Ticket',
            message: 'Test Message',
            priority: 'high',
            category: 'technical',
          },
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data).toHaveProperty('error', 'Authentication required');
    });

    it('should submit contact form successfully', async () => {
      const request = new Request('http://localhost:3000/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact_form',
          data: {
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test Contact',
            message: 'Test Message',
            priority: 'normal',
          },
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response).toBeInstanceOf(NextResponse);
      expect(data).toHaveProperty('message', 'Message sent successfully');
    });

    it('should get tickets for authenticated user', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: {
          session: {
            user: { id: 'user123' },
          },
        },
      });

      const request = new Request('http://localhost:3000/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'get_tickets',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response).toBeInstanceOf(NextResponse);
      expect(data).toHaveProperty('tickets');
      expect(Array.isArray(data.tickets)).toBe(true);
    });

    it('should update ticket status', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({
        data: {
          session: {
            user: { id: 'user123' },
          },
        },
      });

      const request = new Request('http://localhost:3000/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'update_ticket',
          data: {
            ticket_id: '123',
            status: 'closed',
          },
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response).toBeInstanceOf(NextResponse);
      expect(data).toHaveProperty('ticket');
      expect(data.ticket).toHaveProperty('id', '123');
    });

    it('should handle invalid action type', async () => {
      const request = new Request('http://localhost:3000/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'invalid_action',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error', 'Invalid action type');
    });
  });
});
