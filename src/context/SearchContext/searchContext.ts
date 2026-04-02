import { useContext } from "react";
import SearchContext from "./searchProvider";

const useSearchContext = () => useContext(SearchContext);

export default useSearchContext;
