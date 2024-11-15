"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Calendar, Clock, User, Sun, Moon, Trash2, Edit2 } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch } from "@/components/ui/switch";

const localizer = momentLocalizer(moment);

interface Shift {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  approved: boolean;
}

interface ShiftFormData {
  id: string | null;
  title: string;
  start: string;
  end: string;
  color: string;
}

const colorOptions = [
  { value: "#FF5733", label: "Coral", icon: "🟥" },
  { value: "#33B5FF", label: "Sky", icon: "🟦" },
  { value: "#33FF57", label: "Mint", icon: "🟩" },
  { value: "#FFB533", label: "Gold", icon: "🟨" },
  { value: "#B533FF", label: "Lavender", icon: "🟪" },
  { value: "#FF8333", label: "Tangerine", icon: "🟧" },
];

export default function EnhancedCafeSchedule() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [newShift, setNewShift] = useState<ShiftFormData>({
    id: null,
    title: "",
    start: "",
    end: "",
    color: colorOptions[0].value,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [shiftToDelete, setShiftToDelete] = useState<Shift | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get("/api/shifts");
        setShifts(response.data);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };

    fetchShifts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleAddOrEditShift = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShift.title || !newShift.start || !newShift.end) return;

    const shift: ShiftFormData = {
      id: isEditMode && newShift.id ? newShift.id : null,
      title: newShift.title,
      start: moment(newShift.start).toISOString(),
      end: moment(newShift.end).toISOString(),
      color: newShift.color,
    };

    try {
      if (isEditMode) {
        await axios.put("/api/shifts", shift);
        setShifts(
          shifts.map((s) => (s.id === shift.id ? { ...s, ...shift } : s))
        );
        toast.success("Shift updated successfully!", {
          className: "toast-success",
        });
      } else {
        const response = await axios.post("/api/shifts", {
          title: shift.title,
          start: shift.start,
          end: shift.end,
          color: shift.color,
        });
        setShifts((prevShifts) => [...prevShifts, response.data]);
        toast.success("Shift added successfully!", {
          className: "toast-success",
        });
      }
    } catch (error) {
      console.error("Error saving shift:", error);
      toast.error("Error saving shift!", { className: "toast-error" });
    }

    setNewShift({
      id: null,
      title: "",
      start: "",
      end: "",
      color: colorOptions[0].value,
    });
    setIsDialogOpen(false);
    setIsEditMode(false);
  };

  const handleSelectSlot = ({ start, end }) => {
    setNewShift({
      ...newShift,
      start: moment(start).format("YYYY-MM-DDTHH:mm"),
      end: moment(end).format("YYYY-MM-DDTHH:mm"),
    });
    setIsDialogOpen(true);
  };

  const handleSelectEvent = (event) => {
    setNewShift({
      id: event.id,
      title: event.title,
      start: moment(event.start).format("YYYY-MM-DDTHH:mm"),
      end: moment(event.end).format("YYYY-MM-DDTHH:mm"),
      color: event.color,
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDeleteShift = (shift: Shift) => {
    setShiftToDelete(shift);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (shiftToDelete) {
      const updatedShifts = shifts.filter((s) => s.id !== shiftToDelete.id);
      setShifts(updatedShifts);

      try {
        const xx = await axios.delete(`/api/shifts`, {
          data: { id: shiftToDelete.id },
        });
        console.log(xx);

        toast.success("Shift deleted successfully!", {
          className: "toast-success",
        });
      } catch (error) {
        console.error("Error deleting shift:", error);
        toast.error("Error deleting shift!", { className: "toast-error" });

        setShifts(shifts);
      }
      setIsDeleteAlertOpen(false);
    }
  };

  const eventStyleGetter = (event: Shift) => {
    const style = {
      backgroundColor: event.color,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return { style };
  };

  const calculateShiftDuration = (start, end) => {
    const duration = moment.duration(moment(end).diff(moment(start)));
    return Math.round(duration.asHours() * 10) / 10; // Round to 1 decimal place
  };

  const isPastShift = (end) => {
    return moment(end).isBefore(currentDate);
  };

  const sortedShifts = [...shifts].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  console.log("Shifts:", sortedShifts);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-100 to-fuchsia-100 dark:from-violet-950 dark:to-fuchsia-950 text-slate-900 dark:text-white transition-colors duration-200 ease-in-out">
      <ToastContainer />
      <div className="container mx-auto p-2 md:p-4 lg:p-6 max-w-[2000px]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            SchedulePro
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">
              {isDarkMode ? "Dark" : "Light"} Mode
            </span>
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className="data-[state=checked]:bg-purple-400"
            />
            {isDarkMode ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="lg:col-span-3">
            <Card className="overflow-hidden bg-white/50 dark:bg-gradient-to-b dark:from-violet-950 dark:to-fuchsia-950 border-violet-500/20">
              <CardContent className="p-0">
                <BigCalendar
                  localizer={localizer}
                  events={sortedShifts.map((shift) => ({
                    ...shift,
                    start: new Date(shift.start),
                    end: new Date(shift.end),
                  }))}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: "calc(100vh - 200px)" }}
                  views={[Views.MONTH, Views.WEEK, Views.DAY]}
                  step={30}
                  timeslots={2}
                  eventPropGetter={eventStyleGetter}
                  selectable={true}
                  onSelectSlot={handleSelectSlot}
                  onSelectEvent={handleSelectEvent}
                  className="custom-calendar"
                />
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="bg-white/50 dark:bg-gradient-to-b dark:from-violet-950 dark:to-fuchsia-950 border-violet-500/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-blue-400">
                  Shift List
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Past Shifts
                      </h3>
                      <ul className="space-y-3">
                        {sortedShifts
                          .filter((shift) => isPastShift(shift.end))
                          .map((shift) => (
                            <li
                              key={shift.id}
                              className="flex justify-between items-center p-3 bg-purple-900/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-purple-900/50"
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-4 h-4 rounded-full ${shift.color}`}
                                ></div>
                                <span className="font-medium text-white">
                                  {shift.title}
                                </span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className="text-sm text-purple-300">
                                  {calculateShiftDuration(
                                    shift.start,
                                    shift.end
                                  )}{" "}
                                  hours
                                </span>
                                <Button
                                  onClick={() => handleDeleteShift(shift)}
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 p-0 hover:bg-purple-800 group"
                                >
                                  <Trash2 className="h-4 w-4 text-red-400 group-hover:text-red-600" />
                                </Button>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Upcoming Shifts
                      </h3>
                      <ul className="space-y-3">
                        {sortedShifts
                          .filter((shift) => !isPastShift(shift.end))
                          .map((shift) => (
                            <li
                              key={shift.id}
                              className="flex justify-between items-center p-3 bg-purple-900/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-purple-900/50"
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-4 h-4 rounded-full ${shift.color}`}
                                ></div>
                                <span className="font-medium text-white">
                                  {shift.title}
                                </span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className="text-sm text-purple-300">
                                  {calculateShiftDuration(
                                    shift.start,
                                    shift.end
                                  )}{" "}
                                  hours
                                </span>
                                <Button
                                  onClick={() => handleSelectEvent(shift)}
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 p-0 hover:bg-purple-800 group"
                                >
                                  <Edit2 className="h-4 w-4 text-blue-400 group-hover:text-blue-600" />
                                </Button>
                                <Button
                                  onClick={() => handleDeleteShift(shift)}
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 p-0 hover:bg-purple-800 group"
                                >
                                  <Trash2 className="h-4 w-4 text-red-400 group-hover:text-red-600" />
                                </Button>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent className="bg-gradient-to-b from-violet-950/90 to-fuchsia-950/90 border-violet-500/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-semibold text-red-400">
              Delete Shift
            </AlertDialogTitle>
            <AlertDialogDescription className="text-purple-300">
              Are you sure you want to delete this shift? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-purple-800 text-white hover:bg-purple-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white/95 dark:bg-gradient-to-b dark:from-violet-950/90 dark:to-fuchsia-950/90 border-violet-500/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-slate-900 dark:text-blue-400">
              {isEditMode ? "Edit Shift" : "Add New Shift"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddOrEditShift} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-slate-900 dark:text-purple-300"
              >
                Name
              </Label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400 dark:text-purple-400" />
                </div>
                <Input
                  id="name"
                  value={newShift.title}
                  onChange={(e) =>
                    setNewShift({ ...newShift, title: e.target.value })
                  }
                  required
                  className="pl-10 bg-white dark:bg-purple-900/50 border-slate-200 dark:border-purple-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-purple-400"
                  placeholder="Employee name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="start"
                className="text-sm font-medium text-slate-900 dark:text-purple-300"
              >
                Start Time
              </Label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-slate-400 dark:text-purple-400" />
                </div>
                <Input
                  id="start"
                  type="datetime-local"
                  value={newShift.start}
                  onChange={(e) =>
                    setNewShift({ ...newShift, start: e.target.value })
                  }
                  required
                  className="pl-10 bg-white dark:bg-purple-900/50 border-slate-200 dark:border-purple-600 text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="end"
                className="text-sm font-medium text-slate-900 dark:text-purple-300"
              >
                End Time
              </Label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-slate-400 dark:text-purple-400" />
                </div>
                <Input
                  id="end"
                  type="datetime-local"
                  value={newShift.end}
                  onChange={(e) =>
                    setNewShift({ ...newShift, end: e.target.value })
                  }
                  required
                  className="pl-10 bg-white dark:bg-purple-900/50 border-slate-200 dark:border-purple-600 text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="color"
                className="text-sm font-medium text-slate-900 dark:text-purple-300"
              >
                Shift Color
              </Label>
              <Select
                value={newShift.color}
                onValueChange={(value) =>
                  setNewShift({ ...newShift, color: value })
                }
              >
                <SelectTrigger className="w-full bg-white dark:bg-purple-900/50 border-slate-200 dark:border-purple-600 text-slate-900 dark:text-white">
                  <SelectValue placeholder="Select a color">
                    {newShift.color && (
                      <div className="flex items-center">
                        <span className="mr-2">
                          {
                            colorOptions.find((c) => c.value === newShift.color)
                              ?.icon
                          }
                        </span>
                        {
                          colorOptions.find((c) => c.value === newShift.color)
                            ?.label
                        }
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-purple-900 border-slate-200 dark:border-purple-600">
                  {colorOptions.map((color) => (
                    <SelectItem
                      key={color.value}
                      value={color.value}
                      className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-purple-800"
                    >
                      <div className="flex items-center">
                        <span className="mr-2">{color.icon}</span>
                        {color.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
            >
              {isEditMode ? "Update Shift" : "Add Shift"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <style jsx global>{`
        .custom-calendar {
          font-family: ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
            "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol", "Noto Color Emoji";
          color: white;
        }
        .custom-calendar .rbc-toolbar {
          padding: 15px;
          background-color: rgba(88, 28, 135, 0.1);
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        .custom-calendar .rbc-toolbar button {
          color: white;
          background-color: rgba(88, 28, 135, 0.3);
          border: 1px solid rgba(139, 92, 246, 0.2);
          padding: 8px 12px;
          border-radius: 0.375rem;
          font-weight: 500;
          transition: all 0.2s;
          margin: 0 2px;
        }
        .custom-calendar .rbc-toolbar button:hover {
          background-color: rgba(139, 92, 246, 0.4);
        }
        .custom-calendar .rbc-toolbar button.rbc-active {
          background: linear-gradient(
            to right,
            var(--violet-400),
            var(--fuchsia-400)
          );
          color: #ffffff;
          border-color: transparent;
        }
        .custom-calendar .rbc-month-view,
        .custom-calendar .rbc-time-view {
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 0.375rem;
          overflow: hidden;
          background-color: rgba(88, 28, 135, 0.1);
        }
        .custom-calendar .rbc-day-bg + .rbc-day-bg,
        .custom-calendar .rbc-month-row + .rbc-month-row {
          border-color: rgba(139, 92, 246, 0.2);
        }
        .custom-calendar .rbc-header {
          padding: 10px;
          font-weight: 600;
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
        }
        .custom-calendar .rbc-date-cell {
          padding: 5px;
          text-align: center;
        }
        .custom-calendar .rbc-event {
          border-radius: 4px;
          padding: 2px 5px;
          font-size: 0.875rem;
          border: none;
        }
        .custom-calendar .rbc-show-more {
          background: linear-gradient(
            to right,
            var(--violet-400),
            var(--fuchsia-400)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 500;
        }
        .custom-calendar .rbc-today {
          background-color: rgba(139, 92, 246, 0.2);
        }
        .custom-calendar .rbc-off-range-bg {
          background-color: rgba(88, 28, 135, 0.05);
        }
        .custom-calendar .rbc-day-slot .rbc-event,
        .custom-calendar .rbc-month-view .rbc-event {
          background-color: transparent;
        }
        @media (max-width: 640px) {
          .custom-calendar .rbc-toolbar {
            flex-direction: column;
            align-items: stretch;
          }
          .custom-calendar .rbc-toolbar-label {
            margin: 10px 0;
          }
        }
        .toast-success {
          background-color: #4caf50; /* Green for success */
          color: white;
        }
        .toast-error {
          background-color: #f44336; /* Red for error */
          color: white;
        }
        .toast {
          border-radius: 8px;
          padding: 10px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
