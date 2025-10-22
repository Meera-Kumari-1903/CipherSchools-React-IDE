import {
  SandpackProvider,
  SandpackThemeProvider,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackStack,
  SandpackLayout,
  SandpackConsole,
} from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";
import { SandpackFileExplorer } from "sandpack-file-explorer";

export default function IDE() {
    const files = {}
  return (
    <>
      <SandpackProvider template="react"
      files={files}

      >
        <SandpackThemeProvider theme={nightOwl}>
          
            <SandpackLayout>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  minHeight: "300px",
                  maxHeight: "300px",
                  backgroundColor: `var(--sp-colors-surface1)`,
                }}
              >
                <div
                  style={{
                    minWidth: 150,
                    maxWidth: "300px",
                    overflow: "hidden",
                  }}
                >
                  <SandpackFileExplorer />
                </div>
                <div style={{ flex: "min-content" }}>
                  <SandpackCodeEditor
                    wrapContent
                    style={{
                      minHeight: "100%",
                      maxHeight: "100%",
                      overflow: "auto",
                    }}
                    showTabs
                    closableTabs
                    showInlineErrors
                    showLineNumbers
                    
                  />
                </div>
              </div>
              <SandpackPreview 
              showNavigator={true}
              showOpenInCodeSandbox={false}
              showOpenNewtab = {true}
               />
               
            </SandpackLayout>

          
        </SandpackThemeProvider>
      </SandpackProvider>
    </>
  );
}
