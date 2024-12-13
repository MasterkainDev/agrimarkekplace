"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/profile/profile-form";
import { SecuritySettings } from "@/components/profile/security-settings";
import { NotificationSettings } from "@/components/profile/notification-settings";
import { AvatarUpload } from "@/components/profile/avatar-upload";
import { ActivityLog } from "@/components/profile/activity-log";
import { PrivacySettings } from "@/components/profile/privacy-settings";
import { DeleteAccount } from "@/components/profile/delete-account";

export default function ProfilePage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <AvatarUpload />

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileForm />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>

          <TabsContent value="privacy">
            <PrivacySettings />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="activity">
            <ActivityLog />
          </TabsContent>
        </Tabs>

        <div className="pt-6 border-t">
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
}