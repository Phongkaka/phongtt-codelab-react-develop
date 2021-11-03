import React, { Component } from 'react'
import { Table, Button, Popconfirm, Tag, Pagination, Icon, Divider } from 'antd'
import { Container, FitHeightContainer, Page } from 'app/components'

import './style.scss'

import { connect } from 'react-redux'
import { actions } from 'app/store/actions'

import EditUserModal from './edit-user-modal'


const PAGE_SIZE = 5

@connect(state => ({
  usersStore: state.users
}), {
  getUsers: actions.getUsers,
  createUser: actions.createUser,
  updateUser: actions.updateUser,
  deleteUser: actions.deleteUser
})

class Users extends Component {
  componentDidMount() {
    this.props.getUsers({
      page: 1,
      pageSize: PAGE_SIZE
    })
  }

  _onPageChange = (page) => {
    this.props.getUsers({
      page,
      pageSize: PAGE_SIZE
    })
  }

  _onDeleteUser = (user) => {
    this.props.deleteUser(user)
    this.props.getUsers({
      page: 1,
      pageSize: PAGE_SIZE
    })
  }

  render() {
    const { usersStore, createUser, updateUser, getUsers } = this.props

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center'
    }, {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      render: row => (row === 1
        ? (<Tag color="green">Admin</Tag>)
        : (<Tag color="cyan">User</Tag>))
    }, {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (row, record) => (
        <div>
          <Button
            onClick={() => this._editUserModal.open(record)}
          >
            <Icon type="edit" theme="twoTone" />
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="Bạn có chắc xóa người dùng này?"
            onConfirm={() => this._onDeleteUser(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              onClick={this._}
            >
              <Icon type="delete" theme="twoTone" twoToneColor="red" />
            </Button>
          </Popconfirm>
        </div>
      )
    }]

    return (
      <Page className="page page-user">
        <FitHeightContainer hasHeader>
          <Container>
            <button
              className="btn-animation add-btn"
              onClick={() => this._editUserModal.open()}
            >
              Add user
            </button>
            <Table
              pagination={false}
              rowKey={(row, index) => index}
              columns={columns}
              dataSource={usersStore.users.content}
            />
            <Pagination
              defaultCurrent={1}
              pageSize={PAGE_SIZE}
              total={usersStore.users.totalElements}
              onChange={this._onPageChange}
            />
            <EditUserModal
              getUsers={getUsers}
              usersStore={usersStore}
              createUser={createUser}
              updateUser={updateUser}
              ref={(ref) => { this._editUserModal = ref }}
            />
          </Container>
        </FitHeightContainer>
      </Page>
    )
  }
}

export default Users
