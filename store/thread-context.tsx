import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { Thread } from "../models/threads";
import { generateThreadList } from "../utils/dummy-data";



export const ThreadContext = createContext<{threadList: Thread[], reload: Function}>({
  threadList: [],
  reload: () => {},
});

export const ThreadContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    setThreads(generateThreadList());
  }, []);

  function reloadData() {
   setThreads([])
   setThreads(generateThreadList())
  }

  const value = {
    threadList: threads,
    reload: reloadData,
  }

  return (
    <ThreadContext.Provider value={value}>{children}</ThreadContext.Provider>
  );
};
