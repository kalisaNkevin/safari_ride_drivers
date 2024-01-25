import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Declaring props types for ProductCell
interface Props {
  image: string;
  name: string;
  phonenumber: string;
}

function UserProfile({ image, name, phonenumber }: Props): JSX.Element {
  return (
    <MDBox display="flex" alignItems="center" pr={2}>
      <MDBox mr={2}>
        <MDAvatar src={image} alt={name} />
      </MDBox>
      <MDBox height="100%" mt={0.5} lineHeight={1}>
        <MDTypography variant="h5" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="button" color="success" fontWeight="regular">
          {phonenumber}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

export default UserProfile;
