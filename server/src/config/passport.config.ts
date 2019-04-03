// Imports
import { PassportStatic } from "passport";
import {
  ExtractJwt,
  JwtFromRequestFunction,
  Strategy as JwtStrategy
} from "passport-jwt";

// User Model
import User from "../models/User";

// Utils
import Logger from "../utils/logger";
import Keys from "./keys.json";

// Define options object and interface
interface IOptions {
  jwtFromRequest: JwtFromRequestFunction;
  secretOrKey: string;
}

const opts: IOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Keys.secretOrKey
};

export default async (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        user ? done(null, user) : done(null, false);
      } catch (error) {
        Logger.error(error);
        done(error, null);
      }
    })
  );
};
