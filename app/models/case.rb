class Case < ApplicationRecord
  validates :name,  presence: true, uniqueness: {
    scope: :user,
    message: 'The case name has been taken'
  }
  validates :user,  presence: true

  belongs_to :user
  has_many :bills
end
