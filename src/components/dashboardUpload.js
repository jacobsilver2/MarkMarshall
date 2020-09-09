import React, { useState } from "react"
import styled from "styled-components"
import Dropzone from "./dashboardDropzone"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  text-align: left;
  overflow: hidden;
`

const Title = styled.span`
  margin-bottom: 32px;
  color: #555;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 16px;
  box-sizing: border-box;
  width: 100%;
`

const Files = styled.div`
  margin-left: 32px;
  align-items: flex-start;
  justify-items: flex-start;
  flex: 1;
  overflow-y: auto;
`

const Actions = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: flex-end;
  flex-direction: column;
  margin-top: 32px;
`

const Filename = styled.span`
  margin-bottom: 8px;
  font-size: 16px;
  color: #555;
`
const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 50px;
  padding: 8px;
  overflow: hidden;
  box-sizing: border-box;
`

const DashboardUpload = ({ setNewSong }) => {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [successfullyUploaded, setSuccessfullyUploaded] = useState(false)
  const [files, setFiles] = useState([])

  const onFilesAdded = f => {
    // const formdat = new FormData(f[0])
    // console.log(formdat)
    console.log(f[0])
    setFiles(f)
    setNewSong(prev => ({ ...prev, songFile: f }))
  }

  return (
    <Wrapper>
      <Content>
        <div>
          <Dropzone
            onFilesAdded={onFilesAdded}
            disabled={uploading || successfullyUploaded}
          />
        </div>
        <Files>
          <Row>
            <Filename>{files.length > 0 && files[0].name}</Filename>
          </Row>
        </Files>
      </Content>
      <Actions></Actions>
    </Wrapper>
  )
}

export default DashboardUpload
