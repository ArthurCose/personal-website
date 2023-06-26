import Link from "next/link";
import Project from "@/components/project";

import minicraftDsImage from "../../public/project-icons/minicraft-ds.png";
import joshDevelopImage from "../../public/project-icons/josh-develop.png";
import hexagonPuzzleImage from "../../public/project-icons/re4-hexagon-puzzle.png";
import bnWordleImage from "../../public/project-icons/bn-wordle.png";
import licenseRipperImage from "../../public/project-icons/license-ripper.png";
import youtubeControlFixImage from "../../public/project-icons/youtube-control-fix.png";
import watermarkRemoverImage from "../../public/project-icons/watermark-remover-bot.png";
import arthurcoseImage from "../../public/project-icons/arthurcose.png";

export default function Projects() {
  return (
    <>
      {/* <h2>Contributions</h2> */}

      <h2>Personal Projects</h2>

      <Project
        name="Watermark Remover Bot"
        icon={watermarkRemoverImage}
        repo="https://github.com/ArthurCose/watermark-remover-bot"
        link="https://discord.com/api/oauth2/authorize?client_id=761447220586479647&scope=bot&permissions=274877949952"
        linkName="Invite"
      >
        A <Link href="https://discord.com/">Discord</Link> bot that detects,
        removes, and re-uploads posts containing{" "}
        <Link href="https://ifunny.co/">iFunny</Link> and{" "}
        <Link href="https://reddit.com/">Reddit</Link> watermarks.
      </Project>

      <Project
        name="YouTube Control Fix"
        icon={youtubeControlFixImage}
        repo="https://github.com/ArthurCose/YouTube-Control-Fix"
        link="https://chrome.google.com/webstore/detail/youtube-control-fix/pkemfahanpgdcdmgcehgblhagnhacpjo"
        linkName="Install"
      >
        A browser extension that aims to make controlling YouTube videos using
        the arrow keys consistent.
      </Project>

      <Project
        name="Minicraft DS Edition"
        icon={minicraftDsImage}
        repo="https://github.com/ArthurCose/Minicraft-DS-Edition/"
      >
        A homebrew port of{" "}
        <Link href="https://en.wikipedia.org/wiki/Minicraft">Minicraft</Link> to
        the Nintendo DS.
      </Project>

      <Project
        name="License Ripper"
        icon={licenseRipperImage}
        repo="https://github.com/ArthurCose/License-Ripper/"
        link="https://www.npmjs.com/package/license-ripper"
        linkName="npm"
      >
        A tool to find license and project info in npm dependencies, generates a
        JSON file for further processing into a web page. Used to generate the{" "}
        <Link href="/licenses">attribution</Link> page.
      </Project>

      <Project
        name="RE4 Hexagon Puzzle"
        icon={hexagonPuzzleImage}
        repo="https://github.com/ArthurCose/RE4-Hexagon-Puzzle/"
        link="https://arthurcose.github.io/RE4-Hexagon-Puzzle/"
        linkName="Play"
      >
        <Link href="https://www.residentevil.com/re4/en-us/">
          Resident Evil 4
        </Link>
        &apos;s hexagon puzzle as a replayable web game.
        <br />
        <br />
        I&apos;m hoping to revisit this to include more puzzles with another
        ring of hexagons to expand the game into something unique.
      </Project>

      <Project
        name="BN Wordle"
        icon={bnWordleImage}
        repo="https://github.com/ArthurCose/BN-Wordle/"
        link="https://arthurcose.github.io/BN-Wordle/"
        linkName="Play"
      >
        A puzzle game inspired by{" "}
        <Link href="https://www.nytimes.com/games/wordle/index.html">
          Wordle
        </Link>{" "}
        and{" "}
        <Link href="https://www.capcom-games.com/megaman/exe/en-us/">
          MegaMan Battle Network
        </Link>
        &apos;s Navi Customizer.
        <br />
        <br />
        Controls: Arrow Keys, Z = Accept, X = Cancel, A/S = Rotate, and Refresh
        for a new word
      </Project>

      <Project
        name="JoshDevelop"
        icon={joshDevelopImage}
        repo="https://github.com/ArthurCose/JoshDevelop/"
        link="https://www.youtube.com/watch?v=cCpkSRIdujA"
        linkName="Video"
      >
        A collaborative development environment I worked on for creating small
        games from scratch with friends. Josh comes from the name of an old
        friend&apos;s bunny.
      </Project>

      <Project
        name="arthurcose.dev"
        icon={arthurcoseImage}
        repo="https://github.com/ArthurCose/personal-website"
      />
    </>
  );
}
