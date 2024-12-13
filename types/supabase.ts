export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      notifications: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string
          message: string
          read: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          title: string
          message: string
          read?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          title?: string
          message?: string
          read?: boolean
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          email: string
          full_name: string
          avatar_url?: string
          phone?: string
          address?: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          email: string
          full_name: string
          avatar_url?: string
          phone?: string
          address?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          email?: string
          full_name?: string
          avatar_url?: string
          phone?: string
          address?: string
        }
      }
      support_stats: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          category: string
          total_tickets: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          category: string
          total_tickets: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          category?: string
          total_tickets?: number
        }
      }
      tickets: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string
          status: 'open' | 'in_progress' | 'resolved' | 'closed'
          priority: 'low' | 'medium' | 'high'
          category: string
          user_id: string
          profiles: {
            email: string
            full_name: string
          }
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description: string
          status?: 'open' | 'in_progress' | 'resolved' | 'closed'
          priority?: 'low' | 'medium' | 'high'
          category: string
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string
          status?: 'open' | 'in_progress' | 'resolved' | 'closed'
          priority?: 'low' | 'medium' | 'high'
          category?: string
          user_id?: string
        }
      }
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string
          role: 'user' | 'admin'
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          name: string
          role?: 'user' | 'admin'
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string
          role?: 'user' | 'admin'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
