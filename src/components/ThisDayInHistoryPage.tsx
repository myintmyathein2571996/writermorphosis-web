import { useState, useEffect } from "react";
import { Calendar, Clock, Users, Skull, Star, CalendarDays } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";

interface WikiEvent {
  text: string;
  year: number;
  pages?: Array<{
    title: string;
    extract: string;
    thumbnail?: {
      source: string;
    };
  }>;
}

interface WikiResponse {
  selected?: WikiEvent[];
  events?: WikiEvent[];
  births?: WikiEvent[];
  deaths?: WikiEvent[];
}

export function ThisDayInHistoryPage() {
  const [data, setData] = useState<WikiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const month = selectedDate.getMonth() + 1; // 0-indexed
  const day = selectedDate.getDate();

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch history data");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, [month, day, selectedDate]);

  const renderEventCard = (event: WikiEvent, index: number) => {
    const page = event.pages?.[0];
    const yearsAgo = selectedDate.getFullYear() - event.year;

    return (
      <Card
        key={index}
        className="overflow-hidden cursor-pointer active:shadow-lg transition-shadow"
        style={{ backgroundColor: 'var(--thunder)', borderColor: 'var(--tundora)' }}
      >
        {page?.thumbnail && (
          <div className="relative">
            <img
              src={page.thumbnail.source}
              alt={page.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-3 right-3">
              <Badge className="border-0" style={{ backgroundColor: 'var(--header-bg)', color: 'white' }}>
                {event.year}
              </Badge>
            </div>
          </div>
        )}

        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline">{yearsAgo} years ago</Badge>
          </div>

          <p className="mb-3" style={{ color: 'var(--pampas)' }}>{event.text}</p>

          {page?.extract && (
            <p className="text-sm line-clamp-3" style={{ color: 'var(--cotton-seed)' }}>
              {page.extract}
            </p>
          )}

          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--tundora)' }}>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--header-bg)' }}>
              <Clock className="h-4 w-4" />
              <span>{event.year}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSkeletons = () => (
    <>
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="w-full h-48" />
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      ))}
    </>
  );

  if (loading) {
    return (
      <div className="pb-16">
        <div className="p-6" style={{ background: 'linear-gradient(to bottom right, rgba(253, 145, 81, 0.3), rgba(147, 51, 234, 0.3))', color: 'var(--pampas)' }}>
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="h-8 w-8" />
            <h1 style={{ color: 'var(--pampas)' }}>This Day in History</h1>
          </div>
          <p style={{ color: 'var(--swirl)' }}>
            Discover what happened on {formattedDate} throughout history
          </p>
        </div>

        <div className="p-4 space-y-4">{renderSkeletons()}</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="pb-16">
        <div className="p-6" style={{ background: 'linear-gradient(to bottom right, rgba(253, 145, 81, 0.3), rgba(147, 51, 234, 0.3))', color: 'var(--pampas)' }}>
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="h-8 w-8" />
            <h1 style={{ color: 'var(--pampas)' }}>This Day in History</h1>
          </div>
          <p style={{ color: 'var(--swirl)' }}>
            Discover what happened on {formattedDate} throughout history
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <Calendar className="h-16 w-16 mb-4" style={{ color: 'var(--tundora)' }} />
          <h3 className="mb-2" style={{ color: 'var(--pampas)' }}>Unable to load history</h3>
          <p className="text-sm" style={{ color: 'var(--cotton-seed)' }}>
            {error || "Please try again later"}
          </p>
        </div>
      </div>
    );
  }

  const selectedEvents = data.selected || [];
  const events = data.events || [];
  const births = data.births || [];
  const deaths = data.deaths || [];

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="p-6" style={{ background: 'linear-gradient(to bottom right, rgba(253, 145, 81, 0.3), rgba(147, 51, 234, 0.3))', color: 'var(--pampas)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8" />
            <h1 style={{ color: 'var(--pampas)' }}>This Day in History</h1>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-2"
                style={{ 
                  borderColor: 'var(--header-bg)', 
                  color: 'var(--header-bg)',
                  backgroundColor: 'transparent'
                }}
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                {formattedDate}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <p style={{ color: 'var(--swirl)' }}>
          Discover what happened on {formattedDate} throughout history
        </p>
      </div>

      {/* Selected Events */}
      {selectedEvents.length > 0 && (
        <div className="p-4 space-y-4" style={{ background: 'linear-gradient(to bottom right, rgba(147, 51, 234, 0.1), rgba(99, 102, 241, 0.1))' }}>
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-5 w-5" style={{ color: 'var(--header-bg)' }} />
            <h3 style={{ color: 'var(--pampas)' }}>Featured Events</h3>
          </div>
          {selectedEvents.slice(0, 3).map((event, index) =>
            renderEventCard(event, index)
          )}
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="w-full grid grid-cols-3 rounded-none h-12 sticky top-14 z-30 border-b" style={{ backgroundColor: 'var(--content-bg)', borderColor: 'var(--tundora)' }}>
          <TabsTrigger value="events" className="gap-2">
            <Calendar className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="births" className="gap-2">
            <Users className="h-4 w-4" />
            Births
          </TabsTrigger>
          <TabsTrigger value="deaths" className="gap-2">
            <Skull className="h-4 w-4" />
            Deaths
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="m-0">
          <div className="p-4 space-y-4">
            {events.length > 0 ? (
              events.map((event, index) => renderEventCard(event, index))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <Calendar className="h-16 w-16 mb-4" style={{ color: 'var(--tundora)' }} />
                <h3 className="mb-2" style={{ color: 'var(--pampas)' }}>No events found</h3>
                <p className="text-gray-600 text-sm">
                  No events recorded for this date
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="births" className="m-0">
          <div className="p-4 space-y-4">
            {births.length > 0 ? (
              births.map((event, index) => renderEventCard(event, index))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <Users className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="mb-2">No births found</h3>
                <p className="text-gray-600 text-sm">
                  No notable births recorded for this date
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="deaths" className="m-0">
          <div className="p-4 space-y-4">
            {deaths.length > 0 ? (
              deaths.map((event, index) => renderEventCard(event, index))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <Skull className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="mb-2">No deaths found</h3>
                <p className="text-gray-600 text-sm">
                  No notable deaths recorded for this date
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Info Card */}
      <div className="mx-4 mb-4">
        <Card style={{ backgroundColor: 'var(--thunder)', borderColor: 'var(--tundora)' }}>
          <CardContent className="p-4">
            <h4 className="mb-2 flex items-center gap-2" style={{ color: 'var(--pampas)' }}>
              <Calendar className="h-5 w-5" style={{ color: 'var(--header-bg)' }} />
              About This Feature
            </h4>
            <p className="text-sm" style={{ color: 'var(--cotton-seed)' }}>
              Discover historical events, notable births, and deaths that
              occurred on this day throughout history. Data provided by
              Wikipedia.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
