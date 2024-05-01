import { useTheme } from "@mui/material/styles";

import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export type CountCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

function CountCard({ title, value, icon }: CountCardProps) {
  const theme = useTheme();
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                {title}
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: theme.palette.success.main,
                height: "56px",
                width: "56px",
              }}
            >
              {icon}
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CountCard;
