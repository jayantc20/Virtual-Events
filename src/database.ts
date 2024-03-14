import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./models/User";
import { Event } from "./models/Event";
import config from "config";

interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

const nodeEnv: string = config.get("server.NODE_ENV");
const ormConfig = require(`../ormconfig.${nodeEnv}.json`) as DatabaseConfig;

const dataSourceOptions: DataSourceOptions = {
  type: ormConfig.type as any,
  host: ormConfig.host,
  port: ormConfig.port,
  username: ormConfig.username,
  password: ormConfig.password,
  database: ormConfig.database,
  synchronize: ormConfig.synchronize,
  logging: ormConfig.logging,
  entities: [User, Event],
};

export const dataSource = new DataSource(dataSourceOptions);
