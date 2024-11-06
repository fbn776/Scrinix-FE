import Button from "@mui/material/Button";
import apiInstance from "@/lib/api";
import {useNotifications} from "@toolpad/core";
import {useEffect, useState} from "react";
import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import {StateSetter} from "@/lib/types";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from "axios";
import {ICollegeAdmin} from "@/components/admin-tabs/create-admin/ViewAdmins";


type TCollegeAutoComp = { label: string };

function fetchCollegeData(setLoading: StateSetter<boolean>, setCollegeList: StateSetter<TCollegeAutoComp[]>) {
    setLoading(true);
    apiInstance.get('/admin/root/colleges').then((res) => {
        setCollegeList(res.data.map((val: { id: string, name: string }) => {
            return {label: val.id}
        }));
    }).finally(() => {
        setLoading(false);
    })
}

export default function CreatForm({setAdmins}: { setAdmins: StateSetter<ICollegeAdmin[]> }) {
    const [loading, setLoading] = useState(true);
    const notifications = useNotifications();
    const [collegeList, setCollegeList] = useState<TCollegeAutoComp[]>([]);
    const [college, setCollege] = useState<TCollegeAutoComp | null>(null);
    const [notSamePasswordError, setNotSamePasswordError] = useState(false);
    const [userNameAlreadyExistsError, setUserNameAlreadyExistsError] = useState(false);

    useEffect(() => {
        fetchCollegeData(setLoading, setCollegeList);
    }, []);

    return <div>
        <form className="bg-white p-4 rounded-md relative overflow-hidden"
              onSubmit={(e) => {
                  e.preventDefault();

                  setNotSamePasswordError(false);
                  setUserNameAlreadyExistsError(false);

                  const formData = new FormData(e.target as HTMLFormElement);

                  const clgID = formData.get('college'),
                      userName = formData.get('userName'),
                      password = formData.get('password'),
                      confirmPassword = formData.get('confirmPassword');

                  if (password !== confirmPassword) {
                      notifications.show('Password and retyped passwords are not same', {
                          severity: 'error'
                      });
                      setNotSamePasswordError(true);
                      return;
                  }

                  setLoading(true);
                  apiInstance.post('/admin/root/create-admin', {
                      userName: userName,
                      clgID: clgID,
                      password: password
                  }).then((res) => {
                      const result = res.data.data;
                      setAdmins((prev) => {
                          return [result, ...prev];
                      });
                      notifications.show(`${userName} successfully created`, {
                          severity: "success"
                      })
                  }).catch(e => {
                      console.log(e);
                      let message = 'Error while creating user';
                      if (axios.isAxiosError(e)) {
                          const data = e.response?.data;
                          if (data.isDuplicate) {
                              setUserNameAlreadyExistsError(true);
                              message = 'Username already exists';
                          } else
                              message = 'Cannot create user, try again';
                      }
                      notifications.show(message, {
                          severity: "error"
                      });
                  }).finally(() => {
                      setLoading(false);
                  })
              }}>
            {loading && <div
                className='flex items-center justify-center w-full h-full inset-0 text-center p-10 absolute z-10 bg-black bg-opacity-30'>
                <CircularProgress/></div>}

            <h2 className="text-2xl mb-2">Create College Admin</h2>
            <div className="mb-4 flex flex-col gap-2 ">
                <label htmlFor="college">
                    College<span className="text-red-500">*</span>
                    <IconButton onClick={() => fetchCollegeData(setLoading, setCollegeList)}><RefreshIcon/></IconButton>
                </label>
                <Autocomplete
                    options={collegeList}
                    renderInput={(params) =>
                        <TextField {...params}
                                   placeholder='Select college'
                                   name="college"
                                   className="px-4 py-3 rounded-md border-2 border-gray-300 bg-white"
                                   required
                        />
                    }
                    value={college}

                    onChange={(_, newValue) => {
                        setCollege(newValue);
                    }}
                />
            </div>
            <div className="mb-4 flex flex-col gap-2 ">
                <label htmlFor="userName">User name<span className="text-red-500">*</span></label>
                <TextField type="text" name="userName"
                           className="px-4 py-3 rounded-md border-2 border-gray-300 bg-white"
                           placeholder="Enter user name"
                           required
                           helperText={userNameAlreadyExistsError && 'User name already exists'}
                           error={userNameAlreadyExistsError}
                />
            </div>
            <div className="mb-4 flex flex-col gap-2">
                <label htmlFor="password">Password<span className="text-red-500">*</span></label>
                <TextField type="password" name="password"
                           className="px-4 py-3 rounded-md border-2 border-gray-300 bg-white"
                           placeholder="Enter password"
                           required
                           error={notSamePasswordError}
                           helperText={notSamePasswordError && 'Passwords do not match'}
                />
            </div>

            <div className="mb-4 flex flex-col gap-2">
                <label htmlFor="confirmPassword">Confirm password<span className="text-red-500">*</span></label>
                <TextField type="password" name="confirmPassword"
                           className="px-4 py-3 rounded-md border-2 border-gray-300 bg-white"
                           placeholder="Retype password"
                           required
                           error={notSamePasswordError}
                           helperText={notSamePasswordError && 'Passwords do not match'}
                />
            </div>

            <Button variant="contained" type="submit" disabled={loading}>
                Create College
            </Button>
        </form>
    </div>
}