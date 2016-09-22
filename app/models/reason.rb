class Reason < ApplicationRecord
  validates :name,  presence: true, uniqueness: {
    scope: :user,
    message: 'The task already exists'
  }

  belongs_to :user
end
