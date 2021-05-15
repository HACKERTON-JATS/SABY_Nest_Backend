import fs from "fs";
import { NextFunction, Request, Response, Application } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";