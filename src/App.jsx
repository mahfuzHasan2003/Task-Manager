import NavBar from "@/components/my-components/nav-bar";
import TasksContainer from "./components/my-components/tasks-container";
function App() {
  return (
    <div className="w-full max-w-7xl mx-auto lg:h-screen flex flex-col px-3 xl:px-0">
      <NavBar />
      <TasksContainer />
    </div>
  );
}

export default App;
