import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import BlogPage from "./components/blog/test_blog"; // Dynamic blog page
import BlogListPage from "./components/blog/BlogListPage";
import BlogDetailPage from "./components/blog/BlogDetailPage";
import BlogLayout from "./components/blog/BlogLayout";
import ThemeBackground from "./components/ThemeBackground";
import { Live2DProvider } from './components/blog/Live2DContext';

// Main site content as a component
const MainSite = ({ 
  sharedData, 
  resumeData, 
  onLanguageChange 
}) => (
  <div>
    <Header sharedData={sharedData.basic_info} />
    <div className="col-md-12 mx-auto text-center language">
      <div
        onClick={() =>
          onLanguageChange(
            window.$primaryLanguage,
            window.$secondaryLanguageIconId
          )
        }
        style={{ display: "inline" }}
      >
        <span
          className="iconify language-icon mr-5"
          data-icon="twemoji-flag-for-flag-united-kingdom"
          data-inline="false"
          id={window.$primaryLanguageIconId}
        ></span>
      </div>
      <div
        onClick={() =>
          onLanguageChange(
            window.$secondaryLanguage,
            window.$primaryLanguageIconId
          )
        }
        style={{ display: "inline" }}
      >
        <span
          className="iconify language-icon"
          data-icon="twemoji-flag-for-flag-philippines"
          data-inline="false"
          id={window.$secondaryLanguageIconId}
        ></span>
      </div>
    </div>
    <About
      resumeBasicInfo={resumeData.basic_info}
      sharedBasicInfo={sharedData.basic_info}
    />
    <Projects
      resumeProjects={resumeData.projects}
      resumeBasicInfo={resumeData.basic_info}
    />
    <Skills
      sharedSkills={sharedData.skills}
      resumeBasicInfo={resumeData.basic_info}
    />
    <Experience
      resumeExperience={resumeData.experience}
      resumeBasicInfo={resumeData.basic_info}
    />
    <Footer sharedBasicInfo={sharedData.basic_info} />
  </div>
);

// Create a wrapper component to handle location changes
const AppContent = ({ onLocationChange, sharedData, resumeData, onLanguageChange }) => {
  const location = useLocation();
  
  React.useEffect(() => {
    onLocationChange(location.pathname);
  }, [location.pathname, onLocationChange]);

  return (
    <Switch>
      <Route path="/blog" render={({ match: { path } }) => (
        <BlogLayout>
          <Switch>
            <Route exact path="/blog/:project/:blogId" component={BlogDetailPage} />
            <Route exact path="/blog/:project" component={BlogListPage} />
          </Switch>
        </BlogLayout>
      )} />
      <Route path="*" render={() => (
        <MainSite 
          sharedData={sharedData} 
          resumeData={resumeData}
          onLanguageChange={onLanguageChange}
        />
      )} />
    </Switch>
  );
};

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      foo: "bar",
      resumeData: {},
      sharedData: {},
      currentPath: '/'
    };
  }

  handleLocationChange = (pathname) => {
    this.setState({ currentPath: pathname }, () => {
      // Reset the page state when navigating
      if (pathname === '/') {
        this.initializeMainSite();
      }
    });
  };

  initializeMainSite = () => {
    this.loadSharedData();
    this.applyPickedLanguage(
      window.$primaryLanguage,
      window.$secondaryLanguageIconId
    );
  };

  applyPickedLanguage(pickedLanguage, oppositeLangIconId) {
    if (this.state.currentPath === '/') {
      this.swapCurrentlyActiveLanguage(oppositeLangIconId);
    }
    document.documentElement.lang = pickedLanguage;
    var resumePath =
      document.documentElement.lang === window.$primaryLanguage
        ? `res_primaryLanguage.json`
        : `res_secondaryLanguage.json`;
    this.loadResumeFromPath(resumePath);
  }

  swapCurrentlyActiveLanguage(oppositeLangIconId) {
    var pickedLangIconId =
      oppositeLangIconId === window.$primaryLanguageIconId
        ? window.$secondaryLanguageIconId
        : window.$primaryLanguageIconId;
    
    const oppositeIcon = document.getElementById(oppositeLangIconId);
    const pickedIcon = document.getElementById(pickedLangIconId);
    
    if (oppositeIcon) {
      oppositeIcon.removeAttribute("filter", "brightness(40%)");
    }
    if (pickedIcon) {
      pickedIcon.setAttribute("filter", "brightness(40%)");
    }
  }

  componentDidMount() {
    // Initialize based on current path
    if (this.state.currentPath === '/') {
      this.initializeMainSite();
    } else {
      document.documentElement.lang = window.$primaryLanguage;
      this.loadResumeFromPath('res_primaryLanguage.json');
    }
  }

  loadResumeFromPath(path) {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error("Error loading resume data:", err);
      },
    });
  }

  loadSharedData() {
    $.ajax({
      url: `portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ sharedData: data });
        document.title = `${this.state.sharedData.basic_info.name}`;
      }.bind(this),
      error: function (xhr, status, err) {
        console.error("Error loading shared data:", err);
      },
    });
  }

  render() {
    return (
      <>
        <ThemeBackground />
        <div className="app-content">
          <Router>
            <Live2DProvider>
              <AppContent 
                onLocationChange={this.handleLocationChange}
                sharedData={this.state.sharedData}
                resumeData={this.state.resumeData}
                onLanguageChange={this.applyPickedLanguage}
              />
            </Live2DProvider>
          </Router>
        </div>
        <style>{`
          .app-content {
            position: relative;
            z-index: 1;
            min-height: 100vh;
          }
        `}</style>
      </>
    );
  }
}

export default App;
