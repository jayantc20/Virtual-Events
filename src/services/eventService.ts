import { Event } from "../models/Event";
import { User } from "../models/User";
import { dataSource } from "../database";
dataSource.initialize();

export const eventService = {
  createEvent: async (event: Omit<Event, "id">): Promise<Event> => {
    const eventRepository = dataSource.getRepository(Event);
    const newEvent = eventRepository.create(event);
    return await eventRepository.save(newEvent);
  },

  getAllEvents: async (): Promise<Event[]> => {
    const eventRepository = dataSource.getRepository(Event);
    return await eventRepository.find();
  },

  getEvent: async (eventId: number): Promise<Event | undefined> => {
    const eventRepository = dataSource.getRepository(Event);
    return (
      (await eventRepository.findOne({ where: { id: eventId } })) ?? undefined
    );
  },

  updateEvent: async (
    eventId: number,
    updatedEvent: Omit<Event, "id">
  ): Promise<Event | undefined> => {
    const eventRepository = dataSource.getRepository(Event);
    const existingEvent = await eventRepository.findOne({
      where: { id: eventId },
    });

    if (!existingEvent) {
      return undefined;
    }

    const updated = { ...existingEvent, ...updatedEvent };
    return await eventRepository.save(updated);
  },

  registerForEvent: async (
    eventId: number,
    participantId: number
  ): Promise<{ success: boolean; message: string }> => {
    const eventRepository = dataSource.getRepository(Event);
    const userRepository = dataSource.getRepository(User);

    const event = await eventRepository.findOne({
      where: { id: eventId },
      relations: ["participants"],
    });

    if (!event) {
      return { success: false, message: "Event not found" };
    }

    const participant = await userRepository.findOne({
      where: { id: participantId },
    });

    if (!participant) {
      return { success: false, message: "Participant not found" };
    }

    const isAlreadyRegistered = event.participants.some(
      (p) => p.id === participantId
    );
    if (isAlreadyRegistered) {
      return {
        success: false,
        message: "Participant already registered for this event",
      };
    }

    event.participants.push(participant);
    await eventRepository.save(event);

    return { success: true, message: "Registration successful" };
  },
};
