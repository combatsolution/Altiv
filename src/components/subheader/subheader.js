import { Box, Container, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PropTypes from "prop-types";

export default function SubHeader({subtitle}){
    return ( 
        <Box sx={{ backgroundColor: '#E9F4FF', py: 1.5, px: 1, width:"100%" }}>
            <Container maxWidth="md" sx={{ display: 'flex', gap: 1 }}>
                <img src="/assets/home.svg" style={{width: "25px"}}alt="homesvg"/>
                <ArrowForwardIosIcon fontSize="small" sx={{ fontSize: '12px' }} />
                <Typography variant="body2">{subtitle}</Typography> 
            </Container>
        </Box>
    ) 
}
SubHeader.propTypes = {
  subtitle: PropTypes.string
};
