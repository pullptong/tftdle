import {
  ComponentType,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Select, {
  components,
  GroupBase,
  MultiValue,
  OptionProps,
} from "react-select";
import {
  Champion,
  Classes,
  Guess,
  GuessAnswer,
  GuessNumberAnswer,
  IsGuessed,
  Origins,
  TFTSetSelectValue,
} from "./interfaces";
import { sample } from "lodash";
import tftSetOptions from "./config/set";

interface SelectOption {
  value: number;
  label: string;
  raw: Champion;
}

const CustomOption: ComponentType<
  OptionProps<SelectOption, false, GroupBase<SelectOption>> & {
    isInfoOn: boolean;
  }
> = (props) => {
  const { data, isInfoOn } = props;
  return (
    <div>
      <components.Option {...props}>
        <div>
          <p>
            {data.raw.name}{" "}
            <span className="text-xs text-sky-600">Set {data.raw.set}</span>
          </p>
          {isInfoOn && (
            <div className="grid grid-cols-6 gap-1 text-xs">
              <span>Cost {data.raw.cost}</span>
              {data.raw.origin1 ? (
                <span className="col-span-2 flex flex-col">
                  <span>{data.raw.origin1}</span>
                  <span>{data.raw.origin2}</span>
                </span>
              ) : undefined}
              {data.raw.class1 ? (
                <span className="col-span-2 flex flex-col">
                  <span>{data.raw.class1}</span>
                  <span>{data.raw.class2}</span>
                </span>
              ) : undefined}
              {data.raw.range === 1 ? (
                <span>Melee</span>
              ) : (
                <span>Range {data.raw.range}</span>
              )}
            </div>
          )}
        </div>
      </components.Option>
    </div>
  );
};

const App = () => {
  const [selected, setSelected] = useState<number>();
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [guessedList, setGuessedList] = useState<Champion[]>([]);
  const [sets, setSets] = useState<MultiValue<TFTSetSelectValue>>(
    tftSetOptions.slice(-1)
  );
  const [isInfoOn, setIsInfoOn] = useState<boolean>(true);

  const rawOptions = useMemo<Champion[]>(
    () =>
      sets.flatMap(({ champions }) => champions).sort((a, b) => b.set - a.set),
    [sets]
  );

  const origins: Set<Origins> = useMemo<Set<Origins>>(
    () =>
      new Set(
        rawOptions.flatMap(({ origin1, origin2 }) => {
          const result = [];
          if (origin1) {
            result.push(origin1);
          }
          if (origin2) {
            result.push(origin2);
          }
          return result;
        })
      ),
    [rawOptions]
  );

  const classes: Set<Classes> = useMemo<Set<Classes>>(
    () =>
      new Set(
        rawOptions.flatMap(({ class1, class2 }) => {
          const result = [];
          if (class1) {
            result.push(class1);
          }
          if (class2) {
            result.push(class2);
          }
          return result;
        })
      ),
    [rawOptions]
  );

  const [options, setOptions] = useState<Champion[]>(rawOptions);
  const [answer, setAnswer] = useState<Champion | undefined>(
    sample(rawOptions)
  );

  const reset = useCallback(() => {
    setGuesses([]);
    setGuessedList([]);
    setOptions(rawOptions);
    setAnswer(sample(rawOptions));
    setSelected(undefined);
  }, [rawOptions]);

  useEffect(() => {
    reset();
  }, [rawOptions, reset]);

  const guessNumberAnswer = useCallback(
    (value: number, answer: number) =>
      value > answer
        ? GuessNumberAnswer.Under
        : value < answer
        ? GuessNumberAnswer.Over
        : GuessNumberAnswer.Exact,
    []
  );

  const guessAnswer = useCallback(
    (
      value: Origins | Classes | undefined,
      answer: Origins | Classes | undefined,
      answer2: Origins | Classes | undefined
    ) =>
      value === answer
        ? GuessAnswer.Right
        : value === answer2
        ? GuessAnswer.Swap
        : GuessAnswer.Wrong,
    []
  );

  const submit = useCallback(() => {
    if (selected !== undefined && answer) {
      setSelected(undefined);
      const selectedChampion = options[selected];
      const guess: Guess = { name: selectedChampion.name };
      guess.set = guessNumberAnswer(selectedChampion.set, answer.set);
      guess.cost = guessNumberAnswer(selectedChampion.cost, answer.cost);
      guess.origin1 = guessAnswer(
        selectedChampion.origin1,
        answer.origin1,
        answer.origin2
      );
      guess.origin2 = guessAnswer(
        selectedChampion.origin2,
        answer.origin2,
        answer.origin1
      );
      guess.class1 = guessAnswer(
        selectedChampion.class1,
        answer.class1,
        answer.class2
      );
      guess.class2 = guessAnswer(
        selectedChampion.class2,
        answer.class2,
        answer.class1
      );
      guess.range = guessNumberAnswer(selectedChampion.range, answer.range);
      setGuesses((guesses) => [...guesses, guess]);
      setGuessedList((list) => [...list, selectedChampion]);
      setOptions((list) => {
        return list
          .slice(0, selected)
          .concat(list.slice(selected + 1, list.length - 1));
      });
    }
  }, [selected, answer, options, guessAnswer, guessNumberAnswer]);

  const renderGuessNumberAnswer = useCallback(
    (answer: GuessNumberAnswer | undefined) => {
      switch (answer) {
        case GuessNumberAnswer.Under:
          return <i className="fa-solid fa-arrow-down text-red-600"></i>;
        case GuessNumberAnswer.Over:
          return <i className="fa-solid fa-arrow-up text-red-600"></i>;
        case GuessNumberAnswer.Exact:
          return <i className="fa-solid fa-check text-green-600"></i>;
        default:
          return;
      }
    },
    []
  );

  const renderGuessAnswer = useCallback((answer: GuessAnswer | undefined) => {
    switch (answer) {
      case GuessAnswer.Right:
        return <i className="fa-solid fa-check text-green-600"></i>;
      case GuessAnswer.Wrong:
        return <i className="fa-solid fa-xmark text-red-600"></i>;
      case GuessAnswer.Swap:
        return <i className="fa-solid fa-arrows-left-right text-blue-600"></i>;
      default:
        return;
    }
  }, []);

  const isOriginGuessed = useCallback(
    (value: Origins): IsGuessed => {
      for (const [i, guessed] of guessedList.entries()) {
        if ([guessed.origin1, guessed.origin2].includes(value)) {
          if (
            guessed.origin1 === value &&
            (guesses[i].origin1 === GuessAnswer.Right ||
              guesses[i].origin2 === GuessAnswer.Swap)
          ) {
            return IsGuessed.Right;
          }
          if (
            guessed.origin2 === value &&
            (guesses[i].origin2 === GuessAnswer.Right ||
              guesses[i].origin1 === GuessAnswer.Swap)
          ) {
            return IsGuessed.Right;
          }
          return IsGuessed.Wrong;
        }
      }
      return IsGuessed.NotYet;
    },
    [guessedList, guesses]
  );

  const isClassGuessed = useCallback(
    (value: Classes): IsGuessed => {
      for (const [i, guessed] of guessedList.entries()) {
        if ([guessed.class1, guessed.class2].includes(value)) {
          if (
            guessed.class1 === value &&
            (guesses[i].class1 === GuessAnswer.Right ||
              guesses[i].class2 === GuessAnswer.Swap)
          ) {
            return IsGuessed.Right;
          }
          if (
            guessed.class2 === value &&
            (guesses[i].class2 === GuessAnswer.Right ||
              guesses[i].class1 === GuessAnswer.Swap)
          ) {
            return IsGuessed.Right;
          }
          return IsGuessed.Wrong;
        }
      }
      return IsGuessed.NotYet;
    },
    [guessedList, guesses]
  );

  return (
    <div className="container mx-auto flex flex-col justify-center items-center py-12 gap-5 px-3">
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-3xl">TFTdle</h1>
        <h2 className="text-2xl">A TFT wordle-like</h2>
        <h2 className="text-xl">Guess which! You have 7 guesses</h2>
      </div>
      <div className="md:hidden w-full grid grid-cols-8 gap-1 text-center text-sm md:text-md">
        <p>Set</p>
        <p>Cost</p>
        <p>O1</p>
        <p>O2</p>
        <p>C1</p>
        <p>C2</p>
        <p>Range</p>
      </div>
      <div className="hidden w-full md:w-2/3 lg:w-1/2 md:grid grid-cols-8 gap-3 text-center text-sm md:text-md">
        <p>Set</p>
        <p>Cost</p>
        <p>Origin 1</p>
        <p>Origin 2</p>
        <p>Class 1</p>
        <p>Class 2</p>
        <p>Range</p>
      </div>
      {guesses.map((guess, i) => (
        <div
          key={i}
          className="w-full md:w-2/3 lg:w-1/2 grid grid-cols-8 gap-1 md:gap-3 text-center text-sm md:text-base"
        >
          <p>{renderGuessNumberAnswer(guess.set)}</p>
          <p>{renderGuessNumberAnswer(guess.cost)}</p>
          <p>{renderGuessAnswer(guess.origin1)}</p>
          <p>{renderGuessAnswer(guess.origin2)}</p>
          <p>{renderGuessAnswer(guess.class1)}</p>
          <p>{renderGuessAnswer(guess.class2)}</p>
          <p>{renderGuessNumberAnswer(guess.range)}</p>
          <p>{guess.name}</p>
        </div>
      ))}
      <div className="w-full md:w-1/2 flex flex-col md:grid md:grid-cols-4 gap-3 items-center">
        <Select
          className="md:col-span-3 w-full"
          options={options.map((c, i) => ({
            value: i,
            label: `${c.name} Set ${c.set}`,
            raw: c,
          }))}
          styles={{
            menu: (base) => ({
              ...base,
              color: "black",
            }),
          }}
          components={{
            Option: (props) => (
              <CustomOption {...props} isInfoOn={isInfoOn}></CustomOption>
            ),
          }}
          onChange={(selected) => selected && setSelected(selected.value)}
        />
        <button
          className="bg-white rounded text-neutral-900 px-5 py-1.5 disabled:opacity-60"
          disabled={
            guesses.length >= 7 ||
            guessedList[guessedList.length - 1] === answer
          }
          onClick={submit}
        >
          Submit
        </button>
      </div>
      <button
        type="button"
        className="bg-gray-500 rounded text-white px-5 py-1.5"
        onClick={() => setIsInfoOn((isInfoOn) => !isInfoOn)}
      >
        Champion Info {isInfoOn ? "ON" : "OFF"}
      </button>
      {answer && answer === guessedList[guessedList.length - 1] && (
        <div className="text-center">
          <h1>You won!</h1>
          <h2>
            The secret TFT champion was {answer.name} from Set {answer.set}
          </h2>
        </div>
      )}
      {guesses.length >= 7 && answer && answer !== guessedList[6] && (
        <div className="text-center">
          <h1>You lost!</h1>
          <h2>
            The secret TFT champion was {answer.name} from Set {answer.set}
          </h2>
        </div>
      )}
      <div className="w-full md:w-2/3 lg:w-1/3 text-center flex flex-col gap-1">
        <p>Origins</p>
        <div className="flex flex-wrap gap-1 text-sm items-center justify-center">
          {Array.from(origins)
            .sort()
            .map((value) => {
              const isGuessed = isOriginGuessed(value);
              return (
                <div
                  key={value}
                  className={`rounded p-1 ${
                    isGuessed === IsGuessed.Right
                      ? "bg-green-600"
                      : isGuessed === IsGuessed.Wrong
                      ? "bg-gray-600"
                      : "bg-blue-600"
                  }`}
                >
                  {value}
                </div>
              );
            })}
        </div>
      </div>
      <div className="w-full md:w-2/3 lg:w-1/3 text-center flex flex-col gap-1">
        <p>Classes</p>
        <div className="flex flex-wrap gap-1 text-sm items-center justify-center">
          {Array.from(classes)
            .sort()
            .map((value) => {
              const isGuessed = isClassGuessed(value);
              return (
                <div
                  key={value}
                  className={`rounded p-1 ${
                    isGuessed === IsGuessed.Right
                      ? "bg-green-600"
                      : isGuessed === IsGuessed.Wrong
                      ? "bg-gray-600"
                      : "bg-blue-600"
                  }`}
                >
                  {value}
                </div>
              );
            })}
        </div>
      </div>
      <div className="w-full md:w-2/3 lg:w-1/3 text-center flex flex-col gap-1">
        <h1>TFT champions from</h1>
        <Select
          options={tftSetOptions}
          styles={{
            menu: (base) => ({
              ...base,
              color: "black",
            }),
          }}
          isMulti
          value={sets}
          onChange={setSets}
        />
      </div>
      <button
        className="bg-white rounded text-neutral-900 px-5 py-1.5"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
};

export default App;
