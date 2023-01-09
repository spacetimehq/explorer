import { Heading, Stack, Container, VStack } from '@chakra-ui/react'
import { Layout } from 'features/common/Layout'
import { CollectionList } from './CollectionList'

export function CollectionListPage () {
  return (
    <Layout>
      <VStack>
        <Container maxW='container.md' p={4}>
          <Stack spacing={4}>
            <Heading>Collections</Heading>
            <CollectionList />
          </Stack>
        </Container>
      </VStack>
    </Layout>
  )
}