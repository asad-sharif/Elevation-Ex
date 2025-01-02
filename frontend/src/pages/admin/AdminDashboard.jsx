import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container,
    Grid,
    Paper,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    Modal,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { Notification, useToaster } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { PlusSquareIcon } from 'lucide-react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, logoutUser } from '@/slices/authSlice'; // Assuming you have a logout action in your authSlice
import SellIcon from '@mui/icons-material/Sell';
import { ExpandMore } from '@mui/icons-material';
import Column from 'rsuite/esm/Table/TableColumn';
import adminImage from '../../assets/admin.svg'

const drawerWidth = 200;

const AdminDashboard = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState('dashboard');
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [loading, setLoading] = useState(false)
    const [uploadingProgress, setUploadingProgress] = useState(0)
    const [productData, setProductData] = useState({
        name: '',
        headline: '',
        description: '',
        image: '',
        category: 'suits', //default
        quantity: '',
        isPopular: false,
        rating: '',
        price: '',
        customerReviews: '',
    });
    const toast = useToaster();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true

        async function countProducts() {
            const response = await fetch('http://localhost:8000/api/products/count/');
            const data = await response.json();
            setTotalProducts(data.totalProducts);
        }
        countProducts();

        async function countUsers() {
            const response = await fetch('http://localhost:8000/api/user/count/');
            const data = await response.json();
            setTotalUsers(data.totalUsers);
        }
        countUsers();

        async function countOrders() {
            const response = await fetch('http://localhost:8000/api/orders/count/');
            const data = await response.json();
            setTotalOrders(data.totalOrders);
        }
        countOrders();

        async function fetchOrders() {
            const response = await fetch('http://localhost:8000/api/orders/');
            const data = await response.json();
            setOrders(data.orders);
        }
        fetchOrders();

        async function fetchProducts() {
            const response = await fetch('http://localhost:8000/api/products');
            const data = await response.json();
            setProducts(data.products);
        }
        fetchProducts();

        return () => {
            isMounted = false
        }
    }, [setProducts]);

    console.log('Orders:', orders);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setProductData({ ...productData, [name]: checked });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return

        if (file) {
            const upload = new FormData()
            upload.append('file', file)
            upload.append('upload_preset', 'Elevation-Ex')
            upload.append('cloud_name', 'dmuupjjgw')

            try {
                setLoading(true)
                const response = await axios.post('https://api.cloudinary.com/v1_1/dmuupjjgw/image/upload', upload, {
                    onUploadProgress: (progressEvent) => {
                        // Calculate the percentage of upload completed
                        const progress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadingProgress(progress);
                    }
                })
                const uploadedImage = response.data
                // console.log(uploadedImage);

                // const imageUrl = URL.createObjectURL(file);
                setProductData({ ...productData, image: uploadedImage.url });

                setLoading(false)
            } catch (error) {
                console.log('Upload error:', error);
            }

        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (productData.rating < 1 || productData.rating > 5) {
            alert('Rating must be between 1 and 5');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/api/products', productData);
            const newProduct = response.data.ProductData; // Ensure you access the correct data structure

            setProducts((prevProducts) => [...prevProducts, newProduct]);
            setTotalProducts((prevTotal) => prevTotal + 1);

            toast.push(
                <Notification type='success' header='Product added successfully' closable />,
                { placement: 'bottomEnd', duration: 5000 }
            );

            // Clear form
            setProductData({
                name: '',
                headline: '',
                description: '',
                image: '',
                category: '',
                quantity: '',
                isPopular: false,
                rating: '',
                price: '',
                customerReviews: '',
            });
        } catch (error) {
            console.log('Failed to post data to db', error);
            toast.push(
                <Notification type='error' header='Failed to add new product, try again.' closable />,
                { placement: 'bottomEnd', duration: 5000 }
            );
        }
    };

    const handleOpenModal = (product) => {
        setCurrentProduct(product);
        setProductData(product);
        setOpenModal(true);
    };

    const handleCloseModal = () => setOpenModal(false);

    async function handleRemove(id) {
        try {
            await axios.delete(`http://localhost:8000/api/products/${id}`);
            setProducts((prevProducts) => prevProducts.filter(product => product._id !== id));
            setTotalProducts((prevTotal) => prevTotal - 1);

            toast.push(
                <Notification type='success' header='Product deleted successfully' closable />,
                { placement: 'bottomEnd', duration: 5000 }
            );
        } catch (error) {
            console.log('Could not delete', error);
            toast.push(
                <Notification type='error' header='Failed to delete, try again.' closable />,
                { placement: 'bottomEnd', duration: 5000 }
            );
        }
    }

    async function handleUpdateProduct(e) {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/api/products/${currentProduct._id}`, productData);
            const updatedProduct = response.data;

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === currentProduct._id ? updatedProduct : product
                )
            );

            toast.push(
                <Notification type='success' header='Product updated successfully' closable />,
                { placement: 'bottomEnd', duration: 5000 }
            );
            handleCloseModal();
        } catch (error) {
            console.log('Could not update', error);
            toast.push(
                <Notification type='error' header='Failed to update, try again.' closable />,
                { placement: 'bottomEnd', duration: 5000 }
            );
        }
    }

    const handleLogout = () => {
        dispatch(logoutUser()).then(() => {
            toast.push(
                <Notification type='success' header='You have been logged out successfully.' closable />,
                { placement: 'bottomEnd', duration: 5000 }
            );
            navigate('/', { replace: true });
        });
    };

    const handleSectionChange = (section) => {
        setSelectedSection(section);
        if (mobileOpen) {
            setMobileOpen(false);
        }
    };

    const drawerContent = (
        <Box sx={{ overflow: 'auto', mt: '4rem' }}>
            <List>
                <ListItem button onClick={() => handleSectionChange('dashboard')} sx={{cursor:'pointer'}}>
                    <ListItemIcon>
                        <DashboardIcon sx={{ color: '#b91c1c' }} />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography sx={{ color: selectedSection === 'dashboard' ? '#b91c1c' : 'inherit', fontWeight: selectedSection === 'dashboard' ? 'bold' : 'normal',  }}>
                            Dashboard
                        </Typography>
                    </ListItemText>
                </ListItem>

                <ListItem button onClick={() => handleSectionChange('addProduct')} sx={{cursor:'pointer'}}>
                    <ListItemIcon>
                        <AddIcon sx={{ color: '#b91c1c' }} />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography sx={{ color: selectedSection === 'addProduct' ? '#b91c1c' : 'inherit', fontWeight: selectedSection === 'addProduct' ? 'bold' : 'normal',  }}>
                            Add Product
                        </Typography>
                    </ListItemText>
                </ListItem>

                <ListItem button onClick={() => handleSectionChange('products')} sx={{cursor:'pointer'}}>
                    <ListItemIcon>
                        <ShoppingCartIcon sx={{ color: '#b91c1c' }} />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography sx={{ color: selectedSection === 'products' ? '#b91c1c' : 'inherit', fontWeight: selectedSection === 'products' ? 'bold' : 'normal',  }}>
                            All Products
                        </Typography>
                    </ListItemText>
                </ListItem>

                <ListItem button onClick={() => handleSectionChange('orders')} sx={{cursor:'pointer'}}>
                    <ListItemIcon>
                        <SellIcon sx={{ color: '#b91c1c' }} />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography sx={{ color: selectedSection === 'orders' ? '#b91c1c' : 'inherit', fontWeight: selectedSection === 'orders' ? 'bold' : 'normal',  }}>
                            Orders
                        </Typography>
                    </ListItemText>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{
            display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, bgcolor: 'rgba(255, 0, 0, 0.05)', minHeight: '100vh'
        }}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'customRed.main',
                }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Admin Dashboard
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="inherit" onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { width: drawerWidth },
                }}
            >
                {drawerContent}
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar />
                <Container>
                    {selectedSection === 'dashboard' && (
                        <>
                            <Grid container spacing={3} justifyContent={'center'}>
                                {/* USERS CARD */}
                                <Grid item xs={12} sm={6} md={4} key="users">
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Typography variant="h6">Users</Typography>
                                        <Typography variant="h4" fontWeight={'light'}>{totalUsers}</Typography>
                                    </Paper>
                                </Grid>

                                {/* PRODUCTS CARD */}
                                <Grid item xs={12} sm={6} md={4} key="products">
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Typography variant="h6">Products</Typography>
                                        <Typography variant="h4" fontWeight={'light'}>{totalProducts}</Typography>
                                    </Paper>
                                </Grid>

                                {/* ORDERS CARD */}
                                <Grid item xs={12} sm={6} md={4} key="orders">
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Typography variant="h6">Orders</Typography>
                                        <Typography variant="h4" fontWeight={'light'}>{totalOrders}</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>

                            <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center', mt: '4rem' }}>
                                <img src={adminImage} alt="" className='object-center object-cover md:w-1/2 md:mx-auto' />
                            </Box>
                        </>
                    )}

                    {selectedSection === 'addProduct' && (
                        <form onSubmit={handleAddProduct}>
                            <Typography variant="h6" gutterBottom>
                                Add New Product
                            </Typography>
                            <TextField
                                label="Name"
                                name="name"
                                value={productData.name}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Headline"
                                name="headline"
                                value={productData.headline}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Description"
                                name="description"
                                value={productData.description}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                            />

                            <FormControl fullWidth margin="normal" required>
                                <InputLabel id="category-label">Choose a category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category"
                                    name="category"
                                    value={productData.category}
                                    onChange={handleInputChange}
                                    label="Choose a category"
                                >
                                    <MenuItem value="suits">Suits</MenuItem>
                                    <MenuItem value="jackets">Jackets</MenuItem>
                                    <MenuItem value="gloves">Gloves</MenuItem>
                                    <MenuItem value="shoes">Shoes</MenuItem>
                                    <MenuItem value="bags">Bags</MenuItem>
                                    <MenuItem value="helmets">Helmets</MenuItem>
                                </Select>
                            </FormControl>

                            {/* QUANTITY ============ */}
                            <TextField
                                label="Min Quantity"
                                name="quantity"
                                type="number"
                                value={productData.quantity}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                                inputProps={{ min: 1 }}
                                style={{ marginBottom: '1rem' }}
                            />

                            <TextField
                                label="Rating"
                                name="rating"
                                value={productData.rating}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                                inputProps={{ min: 1, max: 5 }}
                            />
                            <TextField
                                label="Price"
                                name="price"
                                value={productData.price}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Customer Reviews"
                                name="customerReviews"
                                multiline
                                rows={4}
                                value={productData.customerReviews}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            // required
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={productData.isPopular}
                                        onChange={handleCheckboxChange}
                                        name="isPopular"

                                    />
                                }
                                label="Is Popular"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                                style={{
                                    margin: '16px 0',
                                    display: 'block',
                                }}
                            />

                            {loading && <p className='text-red-600 italic'>Uploading image {uploadingProgress}%</p>}

                            <Button
                                variant="contained"
                                color="customRed"
                                disabled={loading}
                                startIcon={<AddIcon />}
                                type='submit'
                                sx={{
                                    mt: 2,
                                    color: 'white',
                                }}
                            >
                                Add Product
                            </Button>
                        </form>
                    )}

                    {selectedSection === 'products' && (
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                All Products
                            </Typography>
                            <Grid container spacing={3}>
                                {products.map((product) => (
                                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                                        <Paper
                                            variant='outlined'
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'start',
                                            }}
                                        >
                                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', objectPosition: 'center' }} />
                                            <Typography variant="h6">{product.name}</Typography>
                                            <Typography variant="body1">{product.headline}</Typography>

                                            <Box sx={{ display: 'flex', gap: '1rem', mt: '1rem' }}>
                                                <Button variant="outlined" color="primary" onClick={() => handleOpenModal(product)}>
                                                    Edit
                                                </Button>
                                                <Button variant="contained" color="customRed" sx={{ color: 'white' }} onClick={() => handleRemove(product._id)}>
                                                    Remove
                                                </Button>
                                            </Box>

                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>

                            <Modal
                                open={openModal}
                                onClose={handleCloseModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box
                                    sx={{ px: '1rem', py: '2rem', width: { xs: '90%', md: '50%', lg: '50%' } }}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        boxShadow: 24,
                                        backgroundColor: 'white',
                                        borderRadius: '5px',
                                    }}
                                >
                                    <Typography variant="h6" gutterBottom>
                                        Edit Product
                                    </Typography>

                                    <form onSubmit={handleUpdateProduct}>
                                        <TextField
                                            label="Name"
                                            name="name"
                                            value={productData.name}
                                            onChange={handleInputChange}
                                            fullWidth
                                            margin="normal"
                                            required
                                        />
                                        <TextField
                                            label="Headline"
                                            name="headline"
                                            value={productData.headline}
                                            onChange={handleInputChange}
                                            fullWidth
                                            margin="normal"
                                            required
                                        />
                                        <TextField
                                            label="Description"
                                            name="description"
                                            value={productData.description}
                                            onChange={handleInputChange}
                                            fullWidth
                                            margin="normal"
                                            required
                                        />
                                        <TextField
                                            label="Category"
                                            name="category"
                                            value={productData.category}
                                            onChange={handleInputChange}
                                            fullWidth
                                            margin="normal"
                                            required
                                        />
                                        <TextField
                                            label="Rating"
                                            name="rating"
                                            value={productData.rating}
                                            onChange={handleInputChange}
                                            fullWidth
                                            margin="normal"
                                            required
                                        />
                                        <TextField
                                            label="Price"
                                            name="price"
                                            value={productData.price}
                                            onChange={handleInputChange}
                                            fullWidth
                                            margin="normal"
                                            required
                                        />
                                        <TextField
                                            label="Customer Reviews"
                                            name="customerReviews"
                                            value={productData.customerReviews}
                                            onChange={handleInputChange}
                                            fullWidth
                                            margin="normal"
                                            required
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={productData.isPopular}
                                                    onChange={handleCheckboxChange}
                                                    name="isPopular"

                                                />
                                            }
                                            label="Is Popular"
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            required
                                            style={{
                                                margin: '16px 0',
                                                display: 'block',
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="customRed"
                                            startIcon={<AddIcon />}
                                            type='submit'
                                            sx={{
                                                mt: 2,
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                width: '100%'
                                            }}
                                        >
                                            Save
                                        </Button>
                                    </form>

                                </Box>
                            </Modal>
                        </Box>
                    )}


                    {selectedSection === 'orders' && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Orders
                            </Typography>

                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mb: '2rem'
                                }}
                            >
                                <Typography variant="h6" fontWeight={'light'}>Total Orders</Typography>
                                <Typography variant="h5" fontWeight={'light'}>{totalOrders}</Typography>
                            </Paper>

                            {/* Orders container */}
                            <Box sx={{ overflow: 'auto' }}>
                                {orders.map((order, index) => (
                                    <Accordion key={index}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                            aria-label="Expand"
                                            aria-controls="-content"
                                            id="-header"
                                        >
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '98%' }}>
                                                <Typography variant='caption' sx={{ flex: '1' }}>{index + 1}</Typography>
                                                <Typography variant='body1' sx={{ flex: '7' }}>{order.subject}</Typography>
                                                <Typography variant='caption' sx={{ display: { xs: 'none', sm: 'flex' }, flex: '7' }}>{new Date(order.createdAt).toDateString()}</Typography>
                                                <Typography variant="caption"
                                                    sx={{
                                                        border: `1px solid ${order.orderStatus === 'complete' ? 'rgba(0,255,0,0.5)' : 'rgba(255,0,0,0.5)'}`,
                                                        bgcolor: order.orderStatus === 'complete' ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)',
                                                        borderRadius: '20px',
                                                        px: '.5rem',
                                                        display: { xs: 'none', md: 'flex' }
                                                    }}
                                                >
                                                    {order.orderStatus}
                                                </Typography>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ px: '1rem' }}>
                                            <Box sx={{}}>
                                                <Typography variant="body1" fontWeight={'bold'} mb={'.5rem'}>User Details:</Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '.5rem', alignItems: 'start', mb: '1rem' }}>
                                                    <Typography variant="body2"><strong>Name:</strong> {order.userId.name}</Typography>
                                                    <Typography variant="body2"><strong>Email:</strong> {order.userId.email}</Typography>
                                                    <Typography variant="body2"><strong>User Id:</strong> {order.userId._id}</Typography>
                                                    <Typography variant="body2"><strong>Order Id:</strong> {order._id}</Typography>
                                                </Box>

                                                <Typography variant="body1" fontWeight={'bold'} mb={'.5rem'}>Order Details:</Typography>
                                                {order.products.map((product, productIndex) => (
                                                    <Box sx={{ display: { sm: 'block', md: 'flex' }, gap: '1rem', my: '.7rem', alignItems: 'center', }} key={productIndex}>

                                                        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', mb: { xs: '.5rem', md: '0' } }}>
                                                            <Typography variant="body2">{productIndex + 1}</Typography>
                                                            <img src={product.productId.image} alt="" className='w-[70px] h-[40px] rounded-md object-center object-cover' />
                                                            <Typography variant="body2" fontWeight={'bold'}>{product.productId.name}</Typography>
                                                        </Box>

                                                        <Box sx={{ pl: { xs: '1.5rem', md: '0' }, display: { xs: 'block', md: 'flex' }, gap: '1rem', alignItems: 'center', }}>
                                                            <Typography variant="body2">${product.productId.price}<small>/unit</small> </Typography>
                                                            <Typography variant="body2">{product.quantity} units</Typography>
                                                            <Typography variant="body2">Total Cost: ${product.quantity * product.productId.price}</Typography>
                                                        </Box>

                                                    </Box>
                                                ))}
                                                <Typography variant='caption' sx={{ display: { xs: 'flex', sm: 'none' }, my: '1rem' }}>{new Date(order.createdAt).toDateString()}</Typography>
                                            </Box>

                                            <Typography variant="caption"
                                                sx={{
                                                    border: `1px solid ${order.orderStatus === 'complete' ? 'rgba(0,255,0,0.5)' : 'rgba(255,0,0,0.5)'}`,
                                                    bgcolor: order.orderStatus === 'complete' ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)',
                                                    borderRadius: '20px',
                                                    px: '.5rem',
                                                    display: { xs: 'flex', md: 'none' },
                                                    justifyContent: 'center',
                                                    mt: '1rem'
                                                }}
                                            >
                                                {order.orderStatus}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>

                                ))}
                            </Box>
                        </>

                    )}

                </Container>
            </Box>
        </Box>
    );
};

export default AdminDashboard;