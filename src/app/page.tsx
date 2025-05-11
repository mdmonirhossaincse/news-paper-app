"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Search, Menu, X, ChevronRight } from "lucide-react";

//Article interface
interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: any[];
  events: any[];
}

// Api response type
interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
}

//popular articles section

const PopularNewsSection = ({
  darkMode,
  popularArticles,
  setSelectedArticle,
  formatDate,
}) => (
  <div
    className={`p-5 rounded-xl ${
      darkMode ? "bg-gray-800" : "bg-white"
    } shadow-md`}
  >
    <h3 className="text-xl font-bold mb-5 flex items-center">
      <span className="w-2 h-6 bg-indigo-600 rounded mr-2"></span>
      Popular News
    </h3>
    <div className="space-y-5">
      {popularArticles.slice(0, 5).map((article) => (
        <div
          key={article.id}
          onClick={() => setSelectedArticle(article)}
          className={`rounded-lg cursor-pointer transition hover:bg-opacity-50 ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
        >
          <div className="flex items-start space-x-3 p-3">
            <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <img
                src={article.image_url || "/placeholder.jpg"}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder.jpg";
                }}
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm line-clamp-2">
                {article.title}
              </h4>
              <p
                className={`text-xs mt-1 line-clamp-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {article.news_site} •{" "}
                {formatDate(article.published_at).split(",")[0]}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Category section
const CategoriesSection = ({
  darkMode,
  categories,
  selectedCategory,
  handleCategorySelect,
}) => (
  <div
    className={`p-5 rounded-xl ${
      darkMode ? "bg-gray-800" : "bg-white"
    } shadow-md`}
  >
    <h3 className="text-xl font-bold mb-5 flex items-center">
      <span className="w-2 h-6 bg-purple-600 rounded mr-2"></span>
      Categories
    </h3>
    <div className="space-y-2">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => handleCategorySelect(category.value)}
          className={`w-full text-left px-4 py-3 rounded-lg transition flex justify-between items-center ${
            selectedCategory === category.value
              ? "bg-indigo-600 text-white"
              : darkMode
              ? "hover:bg-gray-700"
              : "hover:bg-gray-100"
          }`}
        >
          <span>{category.name}</span>
          {selectedCategory === category.value && <ChevronRight size={16} />}
        </button>
      ))}
    </div>
  </div>
);

//Subscription section
const NewsletterSection = ({ darkMode }) => (
  <div
    className={`p-5 rounded-xl ${
      darkMode
        ? "bg-gray-800/50 border border-gray-700"
        : "bg-gray-50 border border-gray-200"
    }`}
  >
    <h3 className="text-lg font-bold mb-3">Stay Updated</h3>
    <p
      className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
    >
      Get the latest space news delivered to your inbox
    </p>
    <div className="space-y-3">
      <input
        type="email"
        placeholder="Enter your email"
        className={`w-full px-4 py-2 rounded-lg ${
          darkMode
            ? "bg-gray-700 text-white placeholder-gray-400"
            : "bg-white text-gray-900 placeholder-gray-500"
        } border border-gray-300 dark:border-gray-600`}
      />
      <button
        className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
        onClick={() => alert("Subscribed!")}
      >
        Subscribe
      </button>
    </div>
  </div>
);

//NavBar component

const NavBar = ({
  darkMode,
  setDarkMode,
  categories,
  selectedCategory,
  handleCategorySelect,
  searchQuery,
  setSearchQuery,
  handleSearch,
  mobileMenuOpen,
  setMobileMenuOpen,
  goToHomepage,
}) => (
  <div className="container mx-auto px-4 py-4">
    <div className="flex items-center justify-between">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={goToHomepage}
      >
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
          <span className="text-white font-bold">SN</span>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          <a href="#">SpaceNews</a>
        </span>
      </div>

      <div className="hidden lg:flex items-center space-x-4">
        {/* 0-7 = 8 items */}
        {categories.slice(0, 7).map((category) => (
          <button
            key={category.value}
            onClick={() => handleCategorySelect(category.value)}
            className={`px-3 py-1 rounded-full transition-colors duration-200 ${
              selectedCategory === category.value
                ? "bg-indigo-600 text-white"
                : "hover:bg-indigo-100 hover:text-indigo-800 dark:hover:bg-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div
        className={`hidden md:flex items-center rounded-full px-3 py-2 ${
          darkMode ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        <input
          type="text"
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          className={`bg-transparent outline-none w-40 ${
            darkMode
              ? "text-white placeholder-gray-400"
              : "text-gray-900 placeholder-gray-500"
          }`}
        />
        <button
          onClick={handleSearch}
          className="ml-2 text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <Search size={18} />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full ${
            darkMode
              ? "bg-gray-700 text-yellow-400"
              : "bg-gray-100 text-gray-700"
          }`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-full"
          aria-label="Open menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </div>

    {/* MObile menu  */}

    {mobileMenuOpen && (
      <div
        className={`lg:hidden mt-4 p-4 rounded-lg shadow-lg animate-fadeIn ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex flex-col space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => {
                  handleCategorySelect(category.value);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-lg transition-colors duration-200 text-center ${
                  selectedCategory === category.value
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-indigo-100 hover:text-indigo-800 dark:hover:bg-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div
            className={`flex items-center rounded-full px-3 py-2 mt-2 ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className={`bg-transparent outline-none w-full ${
                darkMode
                  ? "text-white placeholder-gray-400"
                  : "text-gray-900 placeholder-gray-500"
              }`}
            />
            <button
              onClick={() => {
                handleSearch();
                setMobileMenuOpen(false);
              }}
              className="ml-2 text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

// Main article section
const MainArticle = ({ selectedArticle, darkMode, formatDate }) => (
  <article
    className={`rounded-2xl overflow-hidden shadow-xl ${
      darkMode ? "bg-gray-800" : "bg-white"
    }`}
  >
    {selectedArticle.image_url && (
      <div className="relative">
        <img
          src={selectedArticle.image_url}
          alt={selectedArticle.title}
          className="w-full h-96 object-cover"
          onError={(e) => {
            e.target.src = "/placeholder.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between">
          <span className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-full">
            {selectedArticle.news_site}
          </span>
          <span className="px-3 py-1 bg-black/50 text-white text-sm rounded-full backdrop-blur-sm">
            {formatDate(selectedArticle.published_at)}
          </span>
        </div>
      </div>
    )}

    <div className="p-8">
      <h2 className="text-3xl font-bold mb-3">{selectedArticle.title}</h2>
      <div className="flex items-center text-sm mb-6 space-x-2">
        {selectedArticle.launches?.length > 0 && (
          <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Launch Related
          </span>
        )}
        {selectedArticle.events?.length > 0 && (
          <span className="px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            Event Coverage
          </span>
        )}
        {selectedArticle.featured && (
          <span className="px-3 py-1 rounded-full text-xs bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
            Featured
          </span>
        )}
      </div>
      <div className="space-y-5">
        <p
          className={`leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {selectedArticle.summary}
        </p>
        <p
          className={`leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          This article provides an in-depth look at the latest developments in
          space exploration and technology. The content explores the
          implications of these advancements for both scientific research and
          the future of human space travel.
        </p>
        <p
          className={`leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          With organizations like NASA, SpaceX, and other international space
          agencies continuously pushing the boundaries of what's possible, the
          space industry continues to evolve rapidly, offering new insights into
          our universe.
        </p>
        <div
          className={`mt-8 p-5 rounded-lg ${
            darkMode ? "bg-gray-700/50" : "bg-gray-100"
          } border-l-4 border-indigo-500`}
        >
          <h4 className="font-medium mb-2">About this source</h4>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            This article was published by {selectedArticle.news_site}, a source
            for space-related news and information.
            {selectedArticle.launches?.length > 0 &&
              " This article mentions specific space launches or missions."}
            {selectedArticle.events?.length > 0 &&
              " This article is related to specific space events."}
          </p>
        </div>
        <div className="mt-6">
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            For additional information and the complete article, visit the
            original source at:
          </p>
          <a
            href={selectedArticle.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline text-sm mt-1 inline-block"
          >
            {selectedArticle.url}
          </a>
        </div>
      </div>
    </div>
  </article>
);

// Right side popular article section
const Aside = ({
  darkMode,
  popularArticles,
  setSelectedArticle,
  formatDate,
  categories,
  selectedCategory,
  handleCategorySelect,
  selectedArticle,
}) => (
  <div className="space-y-6">
    <PopularNewsSection
      darkMode={darkMode}
      popularArticles={popularArticles}
      setSelectedArticle={setSelectedArticle}
      formatDate={formatDate}
    />
    {selectedArticle === null && (
      <CategoriesSection
        darkMode={darkMode}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect}
      />
    )}
    <NewsletterSection darkMode={darkMode} />
  </div>
);

//Footer with copyright section
const Footer = ({ darkMode, goToHomepage }) => (
  <footer
    className={`py-6 border-t ${
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    }`}
  >
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div
          className="flex items-center space-x-2 mb-4 md:mb-0 cursor-pointer"
          onClick={goToHomepage}
        >
          <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">SN</span>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            <a href="#">SpaceNews</a>
          </span>
        </div>
        <div
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          All right resvered to SpaceNews
        </div>
      </div>
    </div>
  </footer>
);

// Main function starts here.
const Page = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [popularArticles, setPopularArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  const categories = [
    { name: "Articles", value: "articles" },
    { name: "Blogs", value: "blogs" },
    { name: "Reports", value: "reports" },
    { name: "Technology", value: "technology" },
    { name: "Science", value: "science" },
    { name: "Media", value: "media" },
    { name: "Arts", value: "arts" },
    { name: "Launches", value: "launches" },
  ];

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 9, articles.length));
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.spaceflightnewsapi.net/v4/${selectedCategory}?limit=24`
      );
      if (!response.ok) throw new Error("API request failed");
      const data: ApiResponse = await response.json();
      const sortedArticles = [...data.results].sort(
        (a, b) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime()
      );
      const popular = [...data.results]
        .filter((article) => article.featured)
        .slice(0, 8);
      setArticles(sortedArticles);
      setPopularArticles(
        popular.length > 0 ? popular : sortedArticles.slice(0, 8)
      );
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchNews();
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.spaceflightnewsapi.net/v4/${selectedCategory}?search=${encodeURIComponent(
          searchQuery
        )}&limit=24`
      );
      const data: ApiResponse = await response.json();
      setArticles(data.results);
      setPopularArticles([]);
    } catch (error) {
      console.error("Error searching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const goToHomepage = () => {
    setSelectedArticle(null);
  };

  const handleCategorySelect = (categoryValue: string) => {
    setSelectedCategory(categoryValue);
    setSelectedArticle(null);
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header  */}
      <header
        className={`sticky top-0 z-10 shadow-md transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <NavBar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategorySelect={handleCategorySelect}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          goToHomepage={goToHomepage}
        />

        {/* Nabvar  */}
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* if any article clicked  */}
        {selectedArticle ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <MainArticle
                selectedArticle={selectedArticle}
                darkMode={darkMode}
                formatDate={formatDate}
              />
            </div>
            <div className="lg:col-span-1">
              <Aside
                darkMode={darkMode}
                popularArticles={popularArticles}
                setSelectedArticle={setSelectedArticle}
                formatDate={formatDate}
                categories={categories}
                selectedCategory={selectedCategory}
                handleCategorySelect={handleCategorySelect}
                selectedArticle={selectedArticle}
              />
            </div>
          </div>
        ) : (
          // No article selected so show all right side content
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">
                  Latest{" "}
                  {categories.find((c) => c.value === selectedCategory)?.name}
                </h2>
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {articles.length} articles found
                </span>
              </div>
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.slice(0, visibleCount).map((article) => (
                    <div
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className={`rounded-xl overflow-hidden shadow-md cursor-pointer transition transform hover:scale-105 hover:shadow-lg ${
                        darkMode ? "bg-gray-800" : "bg-white"
                      }`}
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={article.image_url || "/placeholder.jpg"}
                          alt={article.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/placeholder.jpg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                            {article.news_site}
                          </span>
                          <span
                            className={`text-xs ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {formatDate(article.published_at).split(",")[0]}
                          </span>
                        </div>
                        <h3 className="font-semibold mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p
                          className={`text-sm line-clamp-3 ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {article.summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* // Load more article button logic  */}
              {articles.length > 9 && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleShowMore}
                    className="px-6 py-2.5 rounded-full flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow transition"
                  >
                    <span>Show more articles</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}

              {/* More articles section */}
              <div id="more-articles" className="mt-12">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-1 h-6 bg-indigo-600 rounded mr-2"></span>
                  More{" "}
                  {categories.find((c) => c.value === selectedCategory)?.name}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {articles.slice(9, 10).map((article) => (
                    <div
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className={`p-4 rounded-lg cursor-pointer flex items-start space-x-4 transition hover:shadow-md ${
                        darkMode
                          ? "hover:bg-gray-800 bg-gray-800/50"
                          : "hover:bg-gray-100 bg-white"
                      }`}
                    >
                      <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                        <img
                          src={article.image_url || "/api/placeholder/100/100"}
                          alt={article.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/api/placeholder/100/100";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                            {article.news_site}
                          </span>
                          <span
                            className={`text-xs ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {formatDate(article.published_at).split(",")[0]}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm mt-1">
                          {article.title}
                        </h4>
                        <p
                          className={`text-xs mt-1 line-clamp-2 ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {article.summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <Aside
                darkMode={darkMode}
                popularArticles={popularArticles}
                setSelectedArticle={setSelectedArticle}
                formatDate={formatDate}
                categories={categories}
                selectedCategory={selectedCategory}
                handleCategorySelect={handleCategorySelect}
                selectedArticle={selectedArticle}
              />
            </div>
          </div>
        )}
      </main>

      <Footer darkMode={darkMode} goToHomepage={goToHomepage} />

      {/* // global styingg for total control  */}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Page;
