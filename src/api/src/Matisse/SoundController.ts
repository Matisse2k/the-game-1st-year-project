import { Request, Response } from "express";
import path from "path";
import fs from "fs";

const SOUND_DIR: string = path.join(__dirname, "../../../src/web/wwwroot/public/sounds");

export class SoundController {
    public getSounds(_: Request, res: Response): void {
        // Checking Directory
        fs.readdir(SOUND_DIR, (err, files) => {
            if (err) {
                console.error("Error reading directory:", err);
                res.status(500).send("Error reading directory");
                return;
            }

            res.json({ sounds: files });
        });
    }

    public playSound(req: Request, res: Response): void {
        const { sound } = req.params;
        const soundPath: string = path.join(SOUND_DIR, sound);

        if (!fs.existsSync(soundPath)) {
            res.status(404).send("Sound not found");
            return;
        }

        const soundUrl: string = `/sounds/${sound}`;
        res.json({ soundUrl });
    }
}
