class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :cases, dependent: :destroy
  has_many :bills, through: :cases
  has_many :reasons, dependent: :destroy
  has_many :downloads, dependent: :destroy
end
