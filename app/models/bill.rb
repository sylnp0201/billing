class Bill < ApplicationRecord
  validates :case_id,  presence: true
  validates :user_id,  presence: true

  belongs_to :user
  belongs_to :case
end
