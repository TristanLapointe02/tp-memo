import { Update } from '@material-ui/icons';
import firebase from 'firebase/app';
import { collUtil, collTaches } from './config';
import { instanceFirestore } from './firebase-initialisation';

/**
 * Créer une nouvelle tâche pour l'utilisateur connecté
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @param {Object} tache document à ajouter aux tâches de l'utilisateur
 * @returns {Promise<null>} Promesse sans paramètre
 */
export async function creer(uid, tache) {
  // On ajoute la propriété 'date' à l'objet représentant la tâche en prenant la 
  // date du serveur Firestore.
  tache.date = firebase.firestore.FieldValue.serverTimestamp();
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
    .add(tache).then(
      tacheRef => tacheRef.get()
    );
}

/**
 * Obtenir toutes les tâches d'un utilisateur
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @returns {Promise<any[]>} Promesse avec le tableau des tâches
 */
export async function lireTout(uid) {
  const taches = [];
  console.log("J'ai été appuyé")
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches).orderBy('completee', 'asc').orderBy('date', 'desc')
                .get().then(
                  reponse => reponse.forEach(
                    doc => {
                      taches.push({id: doc.id, ...doc.data()})
                    }
                  )
                ).then(
                  () => taches
                );
}

/**
 * Obtenir toutes les tâches complétées d'un utilisateur
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @returns {Promise<any[]>} Promesse avec le tableau des tâches
 */
export async function lireToutCompletee(uid) {
  const tachesCompletees = [];
  console.log(tachesCompletees);

  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches).where("completee", "==", true).get().then(
    reponse => reponse.forEach(
      doc => {
        tachesCompletees.push({id: doc.id, ...doc.data()})
      }
    )
  ).then(
    () => tachesCompletees
  );
}

/**
 * Obtenir toutes les tâches non complétées d'un utilisateur
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @returns {Promise<any[]>} Promesse avec le tableau des tâches
 */

export async function lireToutNonCompletee(uid) {
  const tachesNonCompletees = [];
  console.log(tachesNonCompletees);

  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches).where("completee", "==", false).get().then(
    reponse => reponse.forEach(
      doc => {
        tachesNonCompletees.push({id: doc.id, ...doc.data()})
      }
    )
  ).then(
    () => tachesNonCompletees
  );
}


// Basculer l'état d'une tâche.
// UID est collUtil.uid

export async function jeBascule(uid, idTache, completee) {
  
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches).doc(idTache).update(
    {completee: !completee})
}

//SUPPRIMER
export async function supprimer(uid, idTache) {
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches).doc(idTache).delete();
}

//TOUT SUPPRIMER LES TÂCHES COMPLÉTÉES
export async function supprimerCompletees(uid)
{
  return instanceFirestore.collection(collUtil)
  .doc(uid).collection(collTaches)
   .where('completee', '==', true).get().then(
     fctDel =>
     {
       fctDel.forEach(
         doc => doc.ref.delete()
       );
     } 
   );
}