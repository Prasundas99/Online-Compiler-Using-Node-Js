import express from 'express'
import {compileCode} from '../controllers/compile.controllers.js'

const router = express.Router();

router.post('/run', compileCode);

export {router as CompileRouter}