import {
  Bell,
  Moon,
  Globe,
  Shield,
  Eye,
  Download,
  Trash2,
  HelpCircle,
  FileText,
  Lock,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Card, CardContent } from "./ui/card";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SettingsPageProps {
  onBack?: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const { theme, setTheme } = useTheme();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [autoPlayVideos, setAutoPlayVideos] = useState(false);
  const [saveReadingHistory, setSaveReadingHistory] = useState(true);
  const [language, setLanguage] = useState("en");

  const handleDarkModeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
        <h1 className="text-white">Settings</h1>
        <p className="text-sm text-gray-300 mt-1">
          Manage your preferences and account
        </p>
      </div>

      {/* Notifications Section */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3>Notifications</h3>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex-1">
                <div className="mb-1">Push Notifications</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive notifications about new articles
                </p>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between p-4">
              <div className="flex-1">
                <div className="mb-1">Email Notifications</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get weekly digest via email
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appearance Section */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3>Appearance</h3>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex-1">
                <div className="mb-1">Dark Mode</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use dark theme throughout the app
                </p>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={handleDarkModeToggle} />
            </div>
            <Separator />
            <div className="flex items-center justify-between p-4">
              <div className="flex-1">
                <div className="mb-1">Auto-play Videos</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatically play embedded videos
                </p>
              </div>
              <Switch
                checked={autoPlayVideos}
                onCheckedChange={setAutoPlayVideos}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Language Section */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3>Language & Region</h3>
        </div>
        <Card>
          <CardContent className="p-4">
            <div className="mb-1">Language</div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Privacy Section */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3>Privacy & Security</h3>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex-1">
                <div className="mb-1">Save Reading History</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track articles you've read
                </p>
              </div>
              <Switch
                checked={saveReadingHistory}
                onCheckedChange={setSaveReadingHistory}
              />
            </div>
            <Separator />
            <button className="flex items-center justify-between p-4 w-full hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <div className="text-left">
                  <div className="mb-1">Change Password</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Update your password
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-600" />
            </button>
            <Separator />
            <button className="flex items-center justify-between p-4 w-full hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <div className="text-left">
                  <div className="mb-1">Privacy Policy</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Read our privacy policy
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-600" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Data & Storage Section */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Download className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3>Data & Storage</h3>
        </div>
        <Card>
          <CardContent className="p-0">
            <button className="flex items-center justify-between p-4 w-full hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <Download className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <div className="text-left">
                  <div className="mb-1">Download My Data</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Export all your data
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-600" />
            </button>
            <Separator />
            <button className="flex items-center justify-between p-4 w-full hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <Trash2 className="h-5 w-5 text-red-600 dark:text-red-500" />
                <div className="text-left">
                  <div className="mb-1 text-red-600 dark:text-red-500">Clear Cache</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Free up storage space
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-600" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Help & Support Section */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3>Help & Support</h3>
        </div>
        <Card>
          <CardContent className="p-0">
            <button className="flex items-center justify-between p-4 w-full hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <div className="text-left">
                  <div className="mb-1">Help Center</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get help and support
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-600" />
            </button>
            <Separator />
            <button className="flex items-center justify-between p-4 w-full hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <div className="text-left">
                  <div className="mb-1">Terms of Service</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Read our terms
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-600" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* App Info */}
      <div className="p-4 pb-6">
        <Card className="bg-gray-50 dark:bg-gray-900">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">WriteMorphosis</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">Version 1.0.0</p>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <div className="p-4 pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Trash2 className="h-5 w-5 text-red-600 dark:text-red-500" />
          <h3 className="text-red-600 dark:text-red-500">Danger Zone</h3>
        </div>
        <Card className="border-red-200">
          <CardContent className="p-4">
            <Button
              variant="outline"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              Delete Account
            </Button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              This action cannot be undone
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
