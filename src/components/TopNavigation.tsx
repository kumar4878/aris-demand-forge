
import { Bell, User, MapPin, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { motion } from "framer-motion";

const notifications = [
  {
    id: 1,
    type: "warning",
    title: "Low Stock Alert",
    message: "3 SKUs show risk due to low coverage in South region",
    time: "5 mins ago"
  },
  {
    id: 2,
    type: "info",
    title: "Weather Update",
    message: "Rain probability in Gujarat has risen 21% - plan accordingly",
    time: "15 mins ago"
  },
  {
    id: 3,
    type: "success",
    title: "Forecast Approved",
    message: "Q4 baseline forecast has been approved by CXO",
    time: "1 hour ago"
  }
];

const TopNavigation = () => {
  return (
    <motion.header 
      className="h-20 border-b border-border/50 bg-card/95 backdrop-blur-lg px-8 flex items-center justify-between shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-6">
        <SidebarTrigger className="hover:bg-accent/10 transition-colors" />
        
        {/* Context Selector */}
        <div className="flex items-center gap-4">
          <Select defaultValue="national">
            <SelectTrigger className="w-48 bg-background/50 border-border/50">
              <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="national">🇮🇳 National View</SelectItem>
              <SelectItem value="north">📍 North Zone</SelectItem>
              <SelectItem value="south">📍 South Zone</SelectItem>
              <SelectItem value="east">📍 East Zone</SelectItem>
              <SelectItem value="west">📍 West Zone</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="q4-2024">
            <SelectTrigger className="w-40 bg-background/50 border-border/50">
              <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q4-2024">Q4 2024</SelectItem>
              <SelectItem value="q1-2025">Q1 2025</SelectItem>
              <SelectItem value="q2-2025">Q2 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-2 bg-success/10 border border-success/20 rounded-lg">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-sm font-medium text-success">System Healthy</span>
        </div>

        {/* Sync Status */}
        <div className="text-xs text-muted-foreground">
          Last sync: <span className="font-medium text-foreground">2 mins ago</span>
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-accent/10">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive animate-bounce">
                {notifications.length}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary" className="text-xs">
                {notifications.length} new
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4 space-y-1">
                <div className="flex items-center gap-2 w-full">
                  <div className={`w-2 h-2 rounded-full ${
                    notification.type === 'warning' ? 'bg-warning' :
                    notification.type === 'info' ? 'bg-info' : 'bg-success'
                  }`} />
                  <span className="font-medium text-sm">{notification.title}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{notification.time}</span>
                </div>
                <p className="text-xs text-muted-foreground pl-4">{notification.message}</p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm text-primary cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-12 w-auto rounded-lg hover:bg-accent/10 px-3">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  RK
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden lg:block">
                <p className="text-sm font-medium">Ramesh Kumar</p>
                <p className="text-xs text-muted-foreground">Zonal Manager - South</p>
              </div>
              <ChevronDown className="h-4 w-4 ml-2 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-medium leading-none">Ramesh Kumar</p>
                <p className="text-xs leading-none text-muted-foreground">
                  ramesh.kumar@agritech.com
                </p>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs">Zonal Manager</Badge>
                  <Badge variant="outline" className="text-xs">South Zone</Badge>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile & Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MapPin className="mr-2 h-4 w-4" />
              Switch Region
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Notification Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};

export default TopNavigation;
