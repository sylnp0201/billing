module Api
  class BillsController < ApiController

    def index
      startday = params[:startday] || '2012-01-01'
      endday = params[:endday] || '2032-01-01'
      @bills = @current_user.bills
        .includes(:case)
        .where(date: Date.parse(startday).beginning_of_day..Date.parse(endday).end_of_day)
        .order(case_id: :asc, date: :desc)
    end

    def show
      @bill = @current_user.bills.find(params[:id])
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
        params.require(:bill).permit(:id, :case_id, :reason_id, :date, :description, :spent)
      end

  end
end
