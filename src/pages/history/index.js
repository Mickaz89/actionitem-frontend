import { MuiAppBar } from "@/components/MuiAppBar";
import { MuiTable } from "@/components/MuiTable";
import { UserDialog } from "@/components/UserDialog";
import { fetchSavedUsers } from "@/redux/user";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function History() {
  const dispatch = useDispatch();
  const savedUsers = useSelector((state) => state.user.savedUsers);
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    dispatch(fetchSavedUsers());
  }, []);
  return (
    <Box height="100vh">
      <MuiAppBar />
      <UserDialog />
      <Box p={2}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          History
        </Typography>
      </Box>
      <Box>
        {isLoading ? <p>Loading...</p> : <MuiTable data={savedUsers} />}
      </Box>
    </Box>
  );
}
