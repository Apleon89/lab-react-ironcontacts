import allContacts from './contacts.json'
import './App.css';
import { useState } from 'react';

function App() {

  const contacts = allContacts.slice(0, 5)

  const [ actualContacts, setActualContacts ] = useState(contacts)

  const addRandomContact = () => {

    if(allContacts.length === actualContacts.length){
      return
    }

    const randomNumber = Math.floor( Math.random() * allContacts.length);
    const randomContact = allContacts[randomNumber]

    let isContactRepeated = false;
    

    const actualContactsClone = actualContacts.map( each => each)

    actualContacts.forEach( each => {
      if (randomContact.id === each.id) {
        isContactRepeated = true
      }
    })

    if ( isContactRepeated === true ) {
      addRandomContact()
      return
    }

    actualContactsClone.unshift(randomContact)

    setActualContacts(actualContactsClone)
  }

  const sortByPopularity = () => {

    const actualContactsClone = actualContacts.map( each => each)
    
    actualContactsClone.sort( (a,b) => b.popularity - a.popularity)
    
    setActualContacts(actualContactsClone)

  }

  const sortByName = () => {
    const actualContactsClone = actualContacts.map( each => each)
    
    actualContactsClone.sort( (a,b) => a.name.localeCompare(b.name))

    setActualContacts(actualContactsClone)
  }

  const deleteContact = (id) => {

    const contactsUpdate = actualContacts.filter( each => each.id !== id)

    setActualContacts(contactsUpdate)

  }

  return (
    <div className="App">

      <h2>IronContacts</h2>

      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort By popularity</button>
      <button onClick={sortByName}>Sort By Name</button>

      <table style={{
        margin: '0 auto',
      }}>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>won Oscar</th>
            <th>won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {actualContacts.map( each => {
            return (
              <tr key={each.id}>
                <td><img src={each.pictureUrl} alt={each.name} width='50px' /></td>
                <td>{each.name}</td>
                <td>{each.popularity}</td>
                <td>{ each.wonOscar === true && '🏆' }</td>
                <td>{ each.wonEmmy === true && '🌟'}</td>
                <td><button onClick={ () => deleteContact(each.id) }>Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
  );
}

export default App;
