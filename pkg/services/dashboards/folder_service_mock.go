// Code generated by mockery v2.12.1. DO NOT EDIT.

package dashboards

import (
	context "context"

	models "github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/services/user"
	mock "github.com/stretchr/testify/mock"

	testing "testing"
)

// FakeFolderService is an autogenerated mock type for the FolderService type
type FakeFolderService struct {
	mock.Mock
}

// CreateFolder provides a mock function with given fields: ctx, user, orgID, title, uid
func (_m *FakeFolderService) CreateFolder(ctx context.Context, usr *user.SignedInUser, orgID int64, title string, uid, folderUID string) (*models.Folder, error) {
	ret := _m.Called(ctx, usr, orgID, title, uid)

	var r0 *models.Folder
	if rf, ok := ret.Get(0).(func(context.Context, *user.SignedInUser, int64, string, string) *models.Folder); ok {
		r0 = rf(ctx, usr, orgID, title, uid)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*models.Folder)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *user.SignedInUser, int64, string, string) error); ok {
		r1 = rf(ctx, usr, orgID, title, uid)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// DeleteFolder provides a mock function with given fields: ctx, user, orgID, uid, forceDeleteRules
func (_m *FakeFolderService) DeleteFolder(ctx context.Context, usr *user.SignedInUser, orgID int64, uid string, forceDeleteRules bool) (*models.Folder, error) {
	ret := _m.Called(ctx, usr, orgID, uid, forceDeleteRules)

	var r0 *models.Folder
	if rf, ok := ret.Get(0).(func(context.Context, *user.SignedInUser, int64, string, bool) *models.Folder); ok {
		r0 = rf(ctx, usr, orgID, uid, forceDeleteRules)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*models.Folder)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *user.SignedInUser, int64, string, bool) error); ok {
		r1 = rf(ctx, usr, orgID, uid, forceDeleteRules)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetFolderByID provides a mock function with given fields: ctx, user, id, orgID
func (_m *FakeFolderService) GetFolderByID(ctx context.Context, usr *user.SignedInUser, id int64, orgID int64) (*models.Folder, error) {
	ret := _m.Called(ctx, usr, id, orgID)

	var r0 *models.Folder
	if rf, ok := ret.Get(0).(func(context.Context, *user.SignedInUser, int64, int64) *models.Folder); ok {
		r0 = rf(ctx, usr, id, orgID)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*models.Folder)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *user.SignedInUser, int64, int64) error); ok {
		r1 = rf(ctx, usr, id, orgID)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetFolderByTitle provides a mock function with given fields: ctx, user, orgID, title
func (_m *FakeFolderService) GetFolderByTitle(ctx context.Context, usr *user.SignedInUser, orgID int64, title string) (*models.Folder, error) {
	ret := _m.Called(ctx, usr, orgID, title)

	var r0 *models.Folder
	if rf, ok := ret.Get(0).(func(context.Context, *user.SignedInUser, int64, string) *models.Folder); ok {
		r0 = rf(ctx, usr, orgID, title)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*models.Folder)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *user.SignedInUser, int64, string) error); ok {
		r1 = rf(ctx, usr, orgID, title)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetFolderByUID provides a mock function with given fields: ctx, user, orgID, uid
func (_m *FakeFolderService) GetFolderByUID(ctx context.Context, usr *user.SignedInUser, orgID int64, uid string) (*models.Folder, error) {
	ret := _m.Called(ctx, usr, orgID, uid)

	var r0 *models.Folder
	if rf, ok := ret.Get(0).(func(context.Context, *user.SignedInUser, int64, string) *models.Folder); ok {
		r0 = rf(ctx, usr, orgID, uid)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*models.Folder)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *user.SignedInUser, int64, string) error); ok {
		r1 = rf(ctx, usr, orgID, uid)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetFolders provides a mock function with given fields: ctx, user, orgID, limit, page
func (_m *FakeFolderService) GetFolders(ctx context.Context, usr *user.SignedInUser, orgID int64, limit int64, page int64) ([]*models.Folder, error) {
	ret := _m.Called(ctx, usr, orgID, limit, page)

	var r0 []*models.Folder
	if rf, ok := ret.Get(0).(func(context.Context, *user.SignedInUser, int64, int64, int64) []*models.Folder); ok {
		r0 = rf(ctx, usr, orgID, limit, page)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]*models.Folder)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, *user.SignedInUser, int64, int64, int64) error); ok {
		r1 = rf(ctx, usr, orgID, limit, page)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// MakeUserAdmin provides a mock function with given fields: ctx, orgID, userID, folderID, setViewAndEditPermissions
func (_m *FakeFolderService) MakeUserAdmin(ctx context.Context, orgID int64, userID int64, folderID int64, setViewAndEditPermissions bool) error {
	ret := _m.Called(ctx, orgID, userID, folderID, setViewAndEditPermissions)

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, int64, int64, int64, bool) error); ok {
		r0 = rf(ctx, orgID, userID, folderID, setViewAndEditPermissions)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// UpdateFolder provides a mock function with given fields: ctx, user, orgID, existingUid, cmd
func (_m *FakeFolderService) UpdateFolder(ctx context.Context, usr *user.SignedInUser, orgID int64, existingUid string, cmd *models.UpdateFolderCommand) error {
	ret := _m.Called(ctx, usr, orgID, existingUid, cmd)

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, *user.SignedInUser, int64, string, *models.UpdateFolderCommand) error); ok {
		r0 = rf(ctx, usr, orgID, existingUid, cmd)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// NewFakeFolderService creates a new instance of FakeFolderService. It also registers the testing.TB interface on the mock and a cleanup function to assert the mocks expectations.
func NewFakeFolderService(t testing.TB) *FakeFolderService {
	mock := &FakeFolderService{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
