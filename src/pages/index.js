import { MuiAppBar } from "@/components/MuiAppBar";
import { MuiTable } from "@/components/MuiTable";
import { UserDialog } from "@/components/UserDialog";
import { fetchRandomUsers } from "@/redux/user";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const randomUsers = useSelector((state) => state.user.randomUsers);
  const isLoading = useSelector((state) => state.user.isLoading);
  useEffect(() => {
    dispatch(fetchRandomUsers());
  }, []);
  return (
    <Box>
      <MuiAppBar />
      <UserDialog />
      <Box p={2}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fetch
        </Typography>
      </Box>
      <Box>
        {isLoading ? <p>Loading...</p> : <MuiTable data={randomUsers || []} />}
      </Box>
    </Box>
  );
}
