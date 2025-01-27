import { useEffect, useState } from "react";
import LetterSpanner from "./Letters/LetterSpanner";
import { typerPauseRandom } from "../utils/helpers";
import LetterSpan from "./Letters/LetterSpan";

interface TyperProps {
  word: string;
  subtitle: string;
  isLoading: boolean;
  message: string;
}

export default function Typer({ word, subtitle, isLoading, message }: TyperProps) {
  const [mainLetter, setMainLetter] = useState<string>('');
  const [mainLetterMap, setMainLetterMap] = useState<Map<number, string>>(new Map);
  const [subLetter, setSubLetter] = useState<string>('');
  const [subLetterMap, setSubLetterMap] = useState<Map<number, string>>(new Map);

  // After ip is loaded create Map of letters.
  useEffect(() => {
    if (!isLoading) {
      if (mainLetterMap.size === 0) {
        const newMainMap = new Map();
        const newSubMap = new Map();
        word.split('').forEach((letter, i) => newMainMap.set(i,letter));
        subtitle.split('').forEach((letter, i) => newSubMap.set(i,letter));
        setSubLetterMap(newSubMap);
        setMainLetterMap(newMainMap);
      }
      // Check letterSpan default to ensure existing letters aren't duplicated.
      if ((mainLetterMap.size > 0) && (mainLetter === '')) {
        typewriter();
      }
    }
  }, [isLoading, mainLetterMap]);

  // Creates LetterSpans one at a time with typing timeout effect.
  const typewriter = async () => {
    for (const letter of mainLetterMap.values()) {
      await typerPauseRandom();
      const newLetter = letter; // this causes duplicate letters to be dropped
      setMainLetter(newLetter); // TODO: make this an object with key matching map?
    }

    for (const letter of subLetterMap.values()) {
      await typerPauseRandom();
      const newLetter = letter;
      setSubLetter(newLetter);
    }
  };

  return (
    <div className="TyperContainer">
      {isLoading && <h2 className="TyperLoadingTitle">{ message }</h2>}

      {!isLoading && <h3 className="TyperMainLetterSpanner">
        { message } <span> </span>
        <LetterSpanner key="letterspanner1" letter={mainLetter} />
      </h3>}

      {subtitle && <h4 className="TyperSubtitleLetterSpanner">
        <LetterSpanner key="letterspanner2" letter={subLetter} />
      </h4>}
    </div>
  );
}
