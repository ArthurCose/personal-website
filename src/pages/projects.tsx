import Link from "next/link";
import Project from "@/components/project";

import minicraftDsImage from "../../public/project-icons/minicraft-ds.png";
import hexagonPuzzleImage from "../../public/project-icons/re4-hexagon-puzzle.png";
import bnWordleImage from "../../public/project-icons/bn-wordle.png";
import youtubeControlFixImage from "../../public/project-icons/youtube-control-fix.png";
import watermarkRemoverImage from "../../public/project-icons/watermark-remover-bot.png";
import arthurcoseImage from "../../public/project-icons/arthurcose.png";

export default function Projects() {
  return (
    <>
      {/* <h2>Community</h2> */}

      <h2>Personal Projects</h2>

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
        name="RE4 Hexagon Puzzle"
        icon={hexagonPuzzleImage}
        repo="https://github.com/ArthurCose/RE4-Hexagon-Puzzle/"
        link="https://arthurcose.github.io/RE4-Hexagon-Puzzle/"
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
        name="YouTube Control Fix"
        icon={youtubeControlFixImage}
        repo="https://github.com/ArthurCose/YouTube-Control-Fix"
        link="https://chrome.google.com/webstore/detail/youtube-control-fix/pkemfahanpgdcdmgcehgblhagnhacpjo"
      >
        A browser extension that aims to make controlling YouTube videos using
        the arrow keys consistent.
      </Project>

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
        name="arthurcose.dev"
        icon={arthurcoseImage}
        repo="https://github.com/ArthurCose/personal-website"
      >
        The website you&apos;re currently viewing. It&apos;s a little cheesy,
        but I&apos;ve been needing a place to organize my work and it gave me an
        excuse to try a bit of generative art. I&apos;m decently happy with it.
      </Project>
    </>
  );
}
