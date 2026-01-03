import { useEffect, useState } from "react"
const useDebouncedHook = (search,delay=300) => {
      const [debouncedSearch, setDebouncedSearch] = useState("");
    
      useEffect(() => {
       
        let timeoutId;
        if (search !== debouncedSearch) {
          timeoutId = setTimeout(() => {
         
              setDebouncedSearch(search);
          
          },delay); // Adjust the delay as needed
        }
      
        return () => clearTimeout(timeoutId);
      
      }, [search]);
      return debouncedSearch;
}

export default useDebouncedHook