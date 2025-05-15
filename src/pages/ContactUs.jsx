import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import {
    Box,
    Typography,
    TextField,
    Button,
    Container,
    Paper,
    Alert,
    CircularProgress,
    Fade
} from '@mui/material';
import {
    Email as EmailIcon,
    Person as PersonIcon,
    Message as MessageIcon,
    Send as SendIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon
} from '@mui/icons-material';
import Navbar from '../components/Navbar/Navbar';

const contactSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters')
});

const ContactUsPage = () => {
    const [loading, setLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState(null);

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(contactSchema)
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError(null);

            // First get CSRF cookie
            await axios.get('/sanctum/csrf-cookie');

            const response = await axios.post('http://127.0.0.1:8000/api/contact', {
                name: data.name,
                email: data.email,
                message: data.message
            });

            if (response.data.success) {
                setSubmitSuccess(true);
                reset();
                console.log(response)
            }
        } catch (err) {
            console.log(err);
            
            setError(err.response?.data?.message || 'Failed to send message');
        } finally {
            setLoading(false);
        }
    };
    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'radial-gradient(circle at top left, #00D1B2, #1976D2 70%)',
            pb: 8
        }}>
            <Navbar />

            <Container maxWidth="md" sx={{ pt: 8, pb: 4 }}>
                <Fade in timeout={500}>
                    <Paper elevation={6} sx={{
                        p: 4,
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                    }}>
                        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{
                            fontWeight: 'bold',
                            mb: 4,
                            background: 'linear-gradient(45deg, #1976D2, #00D1B2)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Get In Touch
                        </Typography>

                        {submitSuccess && (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                Thank you for your message! We'll get back to you soon.
                            </Alert>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Controller
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Your Name"
                                            fullWidth
                                            variant="outlined"
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
                                            InputProps={{
                                                startAdornment: (
                                                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                                                )
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    '& fieldset': {
                                                        borderColor: '#1976D2'
                                                    },
                                                }
                                            }}
                                        />
                                    )}
                                />

                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Email Address"
                                            fullWidth
                                            variant="outlined"
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                            InputProps={{
                                                startAdornment: (
                                                    <EmailIcon color="primary" sx={{ mr: 1 }} />
                                                )
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    '& fieldset': {
                                                        borderColor: '#1976D2'
                                                    },
                                                }
                                            }}
                                        />
                                    )}
                                />

                                <Controller
                                    name="message"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Your Message"
                                            fullWidth
                                            multiline
                                            rows={6}
                                            variant="outlined"
                                            error={!!errors.message}
                                            helperText={errors.message?.message}
                                            InputProps={{
                                                startAdornment: (
                                                    <MessageIcon color="primary" sx={{ mr: 1, mt: 1, alignSelf: 'flex-start' }} />
                                                )
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    '& fieldset': {
                                                        borderColor: '#1976D2'
                                                    },
                                                }
                                            }}
                                        />
                                    )}
                                />

                                <Box display="flex" justifyContent="center" mt={2}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                                        disabled={loading}
                                        sx={{
                                            px: 5,
                                            py: 1.5,
                                            borderRadius: 2,
                                            background: 'linear-gradient(45deg, #1976D2, #00D1B2)',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </Box>
                            </Box>
                        </form>

                        <Box mt={6} sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: 'space-around',
                            gap: 3,
                            textAlign: 'center'
                        }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <EmailIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                <Typography variant="h6" gutterBottom>Email Us</Typography>
                                <Typography variant="body1">contact@example.com</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <PhoneIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                <Typography variant="h6" gutterBottom>Call Us</Typography>
                                <Typography variant="body1">+1 (555) 123-4567</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <LocationIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                <Typography variant="h6" gutterBottom>Visit Us</Typography>
                                <Typography variant="body1">123 Business Ave, City</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
};

export default ContactUsPage;