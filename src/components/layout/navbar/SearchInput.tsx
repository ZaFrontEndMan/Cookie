
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiSearch, HiX } from "react-icons/hi";
import { useLanguage } from "@/contexts/LanguageContext";

const SearchInput = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log("Searching for:", searchValue);
      // Add your search logic here
    }
  };

  return (
    <div className="relative">
      <motion.div
        initial={false}
        animate={{ width: isExpanded ? 300 : 40 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center"
      >
        {!isExpanded ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(true)}
            className="h-9 w-9"
          >
            <HiSearch className="h-4 w-4" />
          </Button>
        ) : (
          <form onSubmit={handleSearch} className="flex items-center w-full">
            <div className="relative flex-1">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("pages.components.inputs.examples.search.placeholder")}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 pr-10 h-9"
                autoFocus
                onBlur={() => !searchValue && setIsExpanded(false)}
              />
              {searchValue && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSearchValue("");
                    setIsExpanded(false);
                  }}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                >
                  <HiX className="h-3 w-3" />
                </Button>
              )}
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default SearchInput;
