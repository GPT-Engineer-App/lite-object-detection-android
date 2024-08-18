import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const Settings = () => {
  const [folderPath, setFolderPath] = useState('');
  const [toggleStates, setToggleStates] = useState({
    variable1: false,
    variable2: false,
    variable3: false,
  });

  const handleFolderSelection = (event) => {
    const selectedFolder = event.target.files[0].webkitRelativePath.split('/')[0];
    setFolderPath(selectedFolder);
    toast.success(`Selected folder: ${selectedFolder}`);
  };

  const handleToggleChange = (variable) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [variable]: !prevState[variable],
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Settings</CardTitle>
          <p className="text-lg">Configure your settings here.</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <div>
              <label htmlFor="folderSelection">Select Folder:</label>
              <input type="file" id="folderSelection" webkitdirectory="true" onChange={handleFolderSelection} />
            </div>
            <Separator />
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <label htmlFor="variable1">Variable 1:</label>
                <Switch id="variable1" checked={toggleStates.variable1} onCheckedChange={() => handleToggleChange('variable1')} />
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="variable2">Variable 2:</label>
                <Switch id="variable2" checked={toggleStates.variable2} onCheckedChange={() => handleToggleChange('variable2')} />
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="variable3">Variable 3:</label>
                <Switch id="variable3" checked={toggleStates.variable3} onCheckedChange={() => handleToggleChange('variable3')} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;