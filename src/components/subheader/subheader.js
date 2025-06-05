import { Box, Container, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

export default function SubHeader({subtitle}){
    const navigate = useNavigate();
    return ( 
        <Box sx={{ backgroundColor: '#E9F4FF', py: 1.5, width:"100%" }}>
            <Container sx={{ display: 'flex', gap: 1,  alignItems: 'center', }}>
                <img src="/assets/home.svg" style={{width: "25px", cursor: 'pointer'}} alt="homesvg" onClick={() => navigate('/')}/>
                <ArrowForwardIosIcon fontSize="small" sx={{ fontSize: '12px' }} />
                <Typography variant="body2">{subtitle}</Typography> 
            </Container>
        </Box>
    ) 
}
SubHeader.propTypes = {
  subtitle: PropTypes.string
};
