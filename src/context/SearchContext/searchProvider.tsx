import { useState, useEffect, createContext, ReactNode } from "react";

interface ISearchContext {
  searchValue: string;
  setSearchValue: (v: string) => void;
}

const SearchContext = createContext<ISearchContext>({
  searchValue: "",
  setSearchValue: () => {},
});

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState(() => {
    const saved = localStorage.getItem("search");
    return saved ?? "";
  });

  useEffect(() => {
    localStorage.setItem("search", searchValue);
  }, [searchValue]);

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;