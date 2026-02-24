import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, FileText, Calendar, Download } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const investor = {
    name: "Alexandros Vasilias",
    accreditationStatus: "Verified",
    dataRoomAccess: "Granted",
  };

  const notifications = [
    { id: 1, message: "New document 'Q3 2024 Projections' added to the data room.", date: "2024-07-28" },
    { id: 2, message: "Your profile information was successfully updated.", date: "2024-07-25" },
    { id: 3, message: "Welcome to the Baalvion Investor Portal!", date: "2024-07-24" },
  ];

  return (
    <main className="flex-grow bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Investor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {investor.name}.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{notification.message}</p>
                        <p className="text-sm text-muted-foreground">{notification.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Your Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accreditation:</span>
                  <Badge variant={investor.accreditationStatus === 'Verified' ? 'default' : 'secondary'}>
                    {investor.accreditationStatus}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Room Access:</span>
                  <Badge variant={investor.dataRoomAccess === 'Granted' ? 'default' : 'secondary'}>
                    {investor.dataRoomAccess}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col space-y-3">
                <Button asChild>
                  <Link href="/data-room">
                    <FileText />
                    View Documents
                  </Link>
                </Button>
                <Button variant="outline">
                  <Calendar />
                  Schedule Meeting
                </Button>
                <Button variant="outline">
                  <Download />
                  Download Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
