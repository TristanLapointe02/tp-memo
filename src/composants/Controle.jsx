import './Controle.scss';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import * as crudTaches from '../services/crud-taches';

export default function Controle({etatTaches, utilisateur, supprimerTout}) {
  
  return (
    <footer className="Controle">
      <ToggleButtonGroup 
        size="small" 
        exclusive={true} 
      >
        <ToggleButton value={'toutes'} onClick={() => crudTaches.lireTout(utilisateur.uid)}>Toutes</ToggleButton>
        <ToggleButton value={true} onClick={() => crudTaches.lireToutCompletee(utilisateur.uid)}>Complétées</ToggleButton>
        <ToggleButton value={false}>Actives</ToggleButton>
      </ToggleButtonGroup>
      <span className="compte">
       
      {etatTaches.reduce(() => etatTaches[0].length - etatTaches[0].map(a => a.completee).filter(Boolean).length)} tâches restantes
        
      </span>
      <IconButton 
        aria-label="delete" 
        size="small" 
        variant="contained" 
        color="secondary" 
        onClick={() => supprimerTout(etatTaches, utilisateur)} 
        title="Supprimer les tâches complétées"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </footer>
  );
}