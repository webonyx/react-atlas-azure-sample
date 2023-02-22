import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Switch, Route } from 'react-router-dom'

import { SimpleApp, Layout, PageNotFound, Loading, Error, useCurrentUser } from '@webonyx/react-atlas'

import theme from './theme'
import typePolicies from './graphql/typePolicies'
import Navbar from './components/Navbar'
import './sass/default.scss'

export const GET_APP = gql`
  query GetApp {
    viewer {
      profile {
        id
        name: displayName
        firstName
        lastName
        photo
        attuid
        email
      }
    }
    config {
      atlasApps {
        id
        displayName
        children {
          id
          displayName
          logo
          href
        }
      }
    }
    cdo {
      appId
      isAdmin
      isOwner
    }
  }
`

function AppUI() {
  const { data, loading, error } = useQuery(GET_APP)
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useCurrentUser()

  if (loading) {
    return <Loading title="Initializing app..." />
  }

  if (error) {
    return <Loading title="Authorization expired..." />
  }

  const { config = {}, viewer = {} } = data
  setCurrentUser({ ...data.cdo, ...viewer.profile })

  return (
    <>
      <Navbar apps={config.atlasApps} user={viewer.profile} />
      <Switch>
        <Route path="/" exact>
          HOME
        </Route>
        <Route component={PageNotFound} />
      </Switch>
    </>
  )
}

function App() {
  const publicRoutes = [
    {
      path: '/about',
      exact: true,
      render: () => <Error app="THIS IS A PUBLIC PAGE" />,
    },
  ]

  return (
    <SimpleApp theme={theme} typePolicies={typePolicies}>
      <Layout publicRoutes={publicRoutes} app="CDO">
        <AppUI />
      </Layout>
    </SimpleApp>
  )
}

export default App
