import { dataSource } from "../database";
import { User } from "../models/User";
dataSource.initialize();

export const userService = {
  registerUser: async (user: User): Promise<User> => {
    const userRepository = dataSource.getRepository(User);
    const newUser = userRepository.create(user);
    return await userRepository.save(newUser);
  },

  getUserByUsername: async (username: string): Promise<User | null> => {
    const userRepository = dataSource.getRepository(User);
    return (await userRepository.findOne({ where: { username } })) || null;
  },
};
