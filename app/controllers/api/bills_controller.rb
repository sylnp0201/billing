module Api
  class BillsController < ApiController

    before_action :set_user

    def index
      @bills = @current_user.bills.includes(:case)
    end

    def create
      begin
        @bill = Bill.new(user: @current_user)
        @bill.update_attributes(bill_params)
        @bill.save!
        render 'show'
      rescue ActiveRecord::RecordInvalid => e
        render :json => { message: e }, :status => :unprocessable_entity
      end
    end

    def update
      @bill = @current_user.bills.find(params[:id])

      if (@bill.present?)
        @bill.update_attributes(bill_params)
        @bill.save!
        render 'show'
      else
        render :json => { message: 'Billing Record Not Found' }, :status => :unprocessable_entity
      end
    end

    def destroy
      @bill = Bill.find(params[:id])
      if (@bill.user === @current_user)
        @bill.destroy
      else
        render :json => { message: 'Not the owner' }, :status => :unprocessable_entity
      end
    end

    private

      def bill_params
        params.require(:bill).permit(:id, :case_id, :date, :description, :spent)
      end

      def set_user
        @current_user = current_api_user
      end

  end
end
