// Imports
import {
  ExtractJwt,
  JwtFromRequestFunction,
  Strategy as JWTStrategy
} from "passport-jwt";
import { PassportStatic } from "passport";

// User Model
import User from "../models/User";

// Utils
import Keys from "./keys.json";
import Logger from "../utils/logger";

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
    new JWTStrategy(opts, async (jwt_payload, done) => {
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
