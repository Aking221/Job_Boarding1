import '../../styles/AdminCss/Company.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../../context/AuthContext3';

function Company() {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [formValues, setFormValues] = useState({
        nom_entreprise: '',
        secteur_activite: '',
        site_web: '',
        description: '',
        adresse: '',
        region: '',
        telephone: '',
        email: '',
    });
    const { user } = useContext(AuthContext);

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.5,
        },
        {
            field: 'nom_entreprise',
            headerName: 'Company Name',
            flex: 1,
            cellClassName: 'name-column--cell'
        },
        {
            field: 'secteur_activite',
            headerName: 'Sector',
            flex: 1,
            cellClassName: 'name-column--cell',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'site_web',
            headerName: 'Website',
            flex: 1,
            headerAlign: 'left',
            align: 'left',
            cellClassName: 'name-column--cell',
        },
        {
            field: 'telephone',
            headerName: 'Phone',
            flex: 1,
            headerAlign: 'left',
            align: 'left',
            cellClassName: 'name-column--cell',
        },
        {
            field: 'adresse',
            headerName: 'Location',
            flex: 1,
            headerAlign: 'left',
            align: 'left',
            cellClassName: 'name-column--cell',
        },
        {
            field: 'actions',
            headerName: '',
            flex: 0.6,
            cellClassName: 'name-column--cell',
            disableColumnMenu: true,
            renderCell: (params) => (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    height="100%"
                    gap='10px'
                    p='5px'
                >
                    <IconButton
                        onClick={() => handleEdit(params.row)}
                        sx={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: "#FC6EDA",
                            color: "#fff",
                            borderRadius: "50%",
                            "&:hover": {
                                backgroundColor: "#ff69b4",
                            },
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => deleteCompany(params.row.id)}
                        sx={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: "#FC6EDA",
                            color: "#fff",
                            borderRadius: "50%",
                            "&:hover": {
                                backgroundColor: "#ff69b4",
                            },
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )
        },
    ];

    // Fonction pour récupérer les données
    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/entreprises', {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            setRows(response.data);
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

    // Utilisez useEffect pour récupérer les données à la montée du composant
    useEffect(() => {
        if (user?.token) {
            fetchCompanies();
        }
    }, [user]);

    // Fonction pour supprimer une entreprise
    const deleteCompany = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/entreprises/${id}`, {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            setRows(rows.filter((row) => row.id !== id));
        } catch (error) {
            console.error("Error deleting company:", error);
        }
    };

    // Fonction pour gérer l'édition
    const handleEdit = (company) => {
        setSelectedCompany(company);
        setFormValues({
            nom_entreprise: company.nom_entreprise,
            secteur_activite: company.secteur_activite,
            site_web: company.site_web,
            description: company.description,
            adresse: company.adresse,
            region: company.region,
            telephone: company.telephone,
            email: company.email,
        });
        setOpen(true);
    };

    // Fonction pour gérer la mise à jour ou la création d'une entreprise
    const handleSave = async () => {
        try {
            if (selectedCompany) {
                // Update existing company
                await axios.put(`http://localhost:5000/api/entreprises/${selectedCompany.id}`, formValues, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });
            } else {
                // Create new company
                await axios.post('http://localhost:5000/api/entreprises', formValues, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });
            }
            setOpen(false);
            fetchCompanies();
        } catch (error) {
            console.error("Error saving company:", error);
        }
    };

    return (
        <div className='div-page'>
            <div className='company-all'>
                <div className='company-header'>
                    <h2 className='titre-company'>COMPANY</h2>
                    <Button
                        variant='contained'
                        size='small'
                        onClick={() => {
                            setSelectedCompany(null);
                            setFormValues({ nom_entreprise: '', secteur_activite: '', site_web: '', description: '', adresse: '', region: '', telephone: '', email: '' });
                            setOpen(true);
                        }}
                        sx={{
                            height: '30px',
                            borderRadius: '5px',
                            backgroundColor: '#FC6EDA',
                            textTransform: 'none',
                            boxShadow: 'none',
                            fontSize: '14px',
                            fontFamily: 'Open_sans, sans-serif',
                            '&:hover': {
                                boxShadow: 'none',
                                backgroundColor: '#fff',
                                color: '#FC6EDA',
                                border: '1px solid #FC6EDA',
                            }
                        }}
                    >
                        Create Company +
                    </Button>
                </div>
                <Box m='10px 0 0 0' height='75vh'>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        sx={{
                            backgroundColor: '#FFF',
                            "& .MuiDataGrid-root": {
                                border: "1px solid #000",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: '1px solid #fff',
                            },
                            "& .name-column--cell": {
                                backgroundColor: '#fff',
                                color: '#000',
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: '#FC6EDA',
                                color: '#000',
                            },
                        }}
                    />
                </Box>
            </div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{selectedCompany ? 'Edit Company' : 'Create Company'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Company Name"
                        type="text"
                        fullWidth
                        value={formValues.nom_entreprise}
                        onChange={(e) => setFormValues({ ...formValues, nom_entreprise: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Sector"
                        type="text"
                        fullWidth
                        value={formValues.secteur_activite}
                        onChange={(e) => setFormValues({ ...formValues, secteur_activite: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Website"
                        type="text"
                        fullWidth
                        value={formValues.site_web}
                        onChange={(e) => setFormValues({ ...formValues, site_web: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={formValues.description}
                        onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Location"
                        type="text"
                        fullWidth
                        value={formValues.adresse}
                        onChange={(e) => setFormValues({ ...formValues, adresse: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Region"
                        type="text"
                        fullWidth
                        value={formValues.region}
                        onChange={(e) => setFormValues({ ...formValues, region: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Phone"
                        type="text"
                        fullWidth
                        value={formValues.telephone}
                        onChange={(e) => setFormValues({ ...formValues, telephone: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        value={formValues.email}
                        onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        {selectedCompany ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Company;
