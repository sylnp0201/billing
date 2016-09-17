class Case < ApplicationRecord
  validates :name,  presence: true

  has_many :users, :through => :assignments
  has_many :assignments, dependent: :destroy
  has_many :bills
end
